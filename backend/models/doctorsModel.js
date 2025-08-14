const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String , required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String , required: true },
  mode: { type: String, enum: ['online', 'in-person'], required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  bookedSlots: [
   {
    time: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['reserved', 'confirmed', 'completed', 'cancelled'], default: 'reserved' },
    expiresAt: { type: Date }, // Good for 5-minute lock
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' } // Link to full appointment
  }
  ],
  slotDuration: { type: Number, default: 30 }, // minutes
consultationFee: { type: Number, required: true },
availability: {
  monday: { start: String, end: String, available: Boolean },
  tuesday: { start: String, end: String, available: Boolean },
  wednesday: { start: String, end: String, available: Boolean },
  thursday: { start: String, end: String, available: Boolean },
  friday: { start: String, end: String, available: Boolean },
  saturday: { start: String, end: String, available: Boolean },
  sunday: { start: String, end: String, available: Boolean }
}
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);
module.exports = DoctorModel;