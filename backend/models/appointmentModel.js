const mongoose=require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  slot: { type: Date, required: true },
  status: { type: String, enum: ['BOOKED', 'CANCELLED', 'COMPLETED'], default: 'BOOKED' },
  createdAt: { type: Date, default: Date.now }
});

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = AppointmentModel;