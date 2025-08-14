// models/appointmentModel.js - Enhanced with hooks
const mongoose = require('mongoose');
const DoctorModel = require('./doctorsModel');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { 
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  status: { 
    type: String, 
    enum: ['reserved', 'confirmed', 'completed', 'cancelled', 'rescheduled'], 
    default: 'reserved' 
  },
  mode: { type: String, enum: ['online', 'in-person'], required: true },
  reservedAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
  reservationExpiresAt: { type: Date },
  consultationNotes: { type: String },
  prescription: { type: String },
  symptoms: { type: String },
  consultationFee: { type: Number },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  cancellationReason: { type: String },
  reschedulingHistory: [{
    oldDate: Date,
    newDate: Date,
    reason: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

AppointmentModel.collection.createIndex(
  { doctorId: 1, 'timeSlot.start': 1 },
  {
    name: 'uniq_active_slot_per_doctor',
    unique: true,
    partialFilterExpression: { status: { $in: ['reserved','confirmed'] } }
  }
);

// Pre-save hook - runs before saving appointment
appointmentSchema.pre('save', async function(next) {
  try {
    const appointment = this;
    
    // Only sync on new appointments or status changes
    if (appointment.isNew || appointment.isModified('status')) {
      const slotData = {
        time: appointment.timeSlot.start,
        userId: appointment.userId,
        appointmentId: appointment._id,
        status: appointment.status,
        expiresAt: appointment.reservationExpiresAt
      };

      if (appointment.isNew) {
        // Add new slot to doctor
        await DoctorModel.findByIdAndUpdate(
          appointment.doctorId,
          { $push: { bookedSlots: slotData } }
        );
      } else if (appointment.isModified('status')) {
        // Update existing slot status
        await DoctorModel.findOneAndUpdate(
          { _id: appointment.doctorId, 'bookedSlots.appointmentId': appointment._id },
          { 
            $set: { 
              'bookedSlots.$.status': appointment.status,
              'bookedSlots.$.expiresAt': appointment.status === 'confirmed' ? null : appointment.reservationExpiresAt
            }
          }
        );
      }
    }

    // Handle rescheduling
    if (appointment.isModified('timeSlot') && !appointment.isNew) {
      // Remove old slot and add new one
      await DoctorModel.findByIdAndUpdate(
        appointment.doctorId,
        { $pull: { bookedSlots: { appointmentId: appointment._id } } }
      );

      const newSlotData = {
        time: appointment.timeSlot.start,
        userId: appointment.userId,
        appointmentId: appointment._id,
        status: appointment.status
      };

      await DoctorModel.findByIdAndUpdate(
        appointment.doctorId,
        { $push: { bookedSlots: newSlotData } }
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Post-remove hook - runs after appointment is deleted
appointmentSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    try {
      await DoctorModel.findByIdAndUpdate(
        doc.doctorId,
        { $pull: { bookedSlots: { appointmentId: doc._id } } }
      );
    } catch (error) {
      console.error('Error removing slot from doctor after appointment deletion:', error);
    }
  }
});

// Post-deleteMany hook - for bulk deletions (like cleanup job)
appointmentSchema.post('deleteMany', async function() {
  try {
    // This is called after bulk deletion, so we need to clean orphaned slots
    // Get all doctors and remove slots that don't have corresponding appointments
    const doctors = await DoctorModel.find({ 'bookedSlots.0': { $exists: true } });
    
    for (const doctor of doctors) {
      const validSlots = [];
      
      for (const slot of doctor.bookedSlots) {
        const appointmentExists = await AppointmentModel.findById(slot.appointmentId);
        if (appointmentExists) {
          validSlots.push(slot);
        }
      }
      
      doctor.bookedSlots = validSlots;
      await doctor.save();
    }
  } catch (error) {
    console.error('Error cleaning up orphaned slots:', error);
  }
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
module.exports = AppointmentModel;