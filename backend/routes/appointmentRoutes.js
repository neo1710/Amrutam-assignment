const { Router } = require("express");
const AppointmentModel = require("../models/appointmentModel");
const DoctorModel = require("../models/doctorsModel");
const authMiddleware = require("../middlewares/authMiddleware");

const appointmentRoute = Router();

// Get available slots for a doctor
appointmentRoute.get("/doctor/:doctorId/available-slots", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query; // YYYY-MM-DD format

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }

    // Get booked slots for the date
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const bookedAppointments = await AppointmentModel.find({
      doctorId,
      appointmentDate: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: ['reserved', 'confirmed'] }
    });

    // Generate available slots (assuming 30-min slots, 9 AM - 5 PM)
    const availableSlots = generateAvailableSlots(startOfDay, bookedAppointments, doctor.availability);

    res.status(200).send({ availableSlots });
  } catch (error) {
    res.status(500).send({ msg: "Error fetching available slots", error: error.message });
  }
});

// Reserve a slot (5-minute lock)
appointmentRoute.post("/reserve", authMiddleware, async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, mode } = req.body;
    const userId = req.user.id;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }

    // Sync consultation fee from doctor
    const consultationFee = doctor.consultationFee;

    // Check if slot is available
    const conflictingAppointment = await AppointmentModel.findOne({
      doctorId,
      'timeSlot.start': new Date(timeSlot.start),
      $or: [
        { status: 'confirmed' },
        { status: 'reserved', reservationExpiresAt: { $gt: new Date() } }]
    });

    if (conflictingAppointment) {
      return res.status(400).send({ msg: "Slot already reserved" });
    }

    // Create reservation with 5-minute expiry
    const reservation = new AppointmentModel({
      doctorId,
      userId,
      appointmentDate: new Date(appointmentDate),
      timeSlot: {
        start: new Date(timeSlot.start),
        end: new Date(timeSlot.end)
      },
      mode,
      status: 'reserved',
      consultationFee,
      reservationExpiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    });

    await reservation.save();

    res.status(201).send({
      msg: "Slot reserved successfully",
      appointmentId: reservation._id,
      expiresAt: reservation.reservationExpiresAt
    });

  } catch (error) {
    res.status(500).send({ msg: "Error reserving slot", error: error.message });
  }
});

// Confirm appointment (mock OTP step)
appointmentRoute.post("/confirm/:appointmentId", authMiddleware, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { otpCode } = req.body; // Mock OTP

    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ msg: "Appointment not found" });
    }

    // Check if reservation expired
    if (appointment.reservationExpiresAt < new Date()) {
      await AppointmentModel.findByIdAndDelete(appointmentId);
      return res.status(400).send({ msg: "Reservation expired" });
    }
    if (appointment.status === 'confirmed') {
      return res.status(200).send({ msg: "Already confirmed", appointment }); 
    }
    // Mock OTP validation (in real app, validate against sent OTP)
    if (otpCode !== "123456") {
      return res.status(400).send({ msg: "Invalid OTP" });
    }

    appointment.status = 'confirmed';
    appointment.confirmedAt = new Date();
    appointment.reservationExpiresAt = undefined;

    await appointment.save();

    res.status(200).send({ msg: "Appointment confirmed successfully", appointment });

  } catch (error) {
    res.status(500).send({ msg: "Error confirming appointment", error: error.message });
  }
});

// Get user appointments with filtering
appointmentRoute.get("/my-appointments", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, type, doctorId } = req.query; // Added doctorId to query params

    let filter = {};

    // Add userId or doctorId based on what's provided
    if (doctorId) {
      filter.doctorId = doctorId;
    } else {
      filter.userId = userId;
    }

    if (status) {
      filter.status = status;
    }

    if (type === 'upcoming') {
      filter.appointmentDate = { $gte: new Date() };
    } else if (type === 'past') {
      filter.appointmentDate = { $lt: new Date() };
    }

    const appointments = await AppointmentModel
      .find(filter)
      .populate('doctorId', 'name specialization mode')
      .sort({ appointmentDate: type === 'past' ? -1 : 1 });

    res.status(200).send(appointments);

  } catch (error) {
    res.status(500).send({ msg: "Error fetching appointments", error: error.message });
  }
});

// Cancel appointment
appointmentRoute.patch("/cancel/:appointmentId", authMiddleware, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { reason } = req.body;

    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ msg: "Appointment not found" });
    }

    // Check 24-hour cancellation policy
    const hoursDifference = (appointment.timeSlot.start - new Date()) / (1000 * 60 * 60);
    if (hoursDifference <= 24) {
      return res.status(400).send({
        msg: "Cancellation allowed only 24 hours before appointment"
      });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = reason;

    await appointment.save();

    res.status(200).send({ msg: "Appointment cancelled successfully" });

  } catch (error) {
    res.status(500).send({ msg: "Error cancelling appointment", error: error.message });
  }
});

// Reschedule appointment
appointmentRoute.patch("/reschedule/:appointmentId", authMiddleware, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { newDate, newTimeSlot, reason } = req.body;

    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ msg: "Appointment not found" });
    }

    // Check 24-hour rescheduling policy
    const hoursDifference = (appointment.timeSlot.start - new Date()) / (1000 * 60 * 60);
    if (hoursDifference <= 24) {
      return res.status(400).send({
        msg: "Rescheduling allowed only 24 hours before appointment"
      });
    }

    // Check if new slot is available
    const conflictingAppointment = await AppointmentModel.findOne({
      doctorId: appointment.doctorId,
      'timeSlot.start': new Date(newTimeSlot.start),
      status: { $in: ['confirmed'] },
      _id: { $ne: appointmentId }
    });

    if (conflictingAppointment) {
      return res.status(400).send({ msg: "New slot not available" });
    }

    // Save rescheduling history
    appointment.reschedulingHistory.push({
      oldDate: appointment.appointmentDate,
      newDate: new Date(newDate),
      reason
    });

    appointment.appointmentDate = new Date(newDate);
    appointment.timeSlot = {
      start: new Date(newTimeSlot.start),
      end: new Date(newTimeSlot.end)
    };

    await appointment.save();

    res.status(200).send({ msg: "Appointment rescheduled successfully", appointment });

  } catch (error) {
    res.status(500).send({ msg: "Error rescheduling appointment", error: error.message });
  }
});

// Helper function to generate available slots
function generateAvailableSlots(date, bookedAppointments, doctorAvailability) {
  const slots = [];
  const keyByIdx = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const availability = doctorAvailability[keyByIdx[date.getDay()]];

  if (!availability || !availability.available) {
    return slots; // Return empty slots if doctor is not available
  }

  const [startHour, startMinute] = availability.start.split(':').map(Number);
  const [endHour, endMinute] = availability.end.split(':').map(Number);
  const slotDuration = 30; // 30 minutes

  const bookedTimes = bookedAppointments.map(apt => apt.timeSlot.start.getTime());

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += slotDuration) {
      // Skip if we're before start time or after end time
      if ((hour === startHour && minutes < startMinute) ||
        (hour === endHour && minutes >= endMinute)) {
        continue;
      }

      const slotStart = new Date(date);
      slotStart.setHours(hour, minutes, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

      if (!bookedTimes.includes(slotStart.getTime())) {
        slots.push({
          start: slotStart,
          end: slotEnd
        });
      }
    }
  }

  return slots;
}

module.exports = appointmentRoute;