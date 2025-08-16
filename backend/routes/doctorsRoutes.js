// routes/doctorRoutes.js
const { Router } = require("express");
const bcrypt = require("bcrypt");
const dotenv=require("dotenv");
const jwt = require("jsonwebtoken");
const DoctorModel = require("../models/doctorsModel");
const validateUserRegistration = require("../middlewares/validationMiddleware");
const doctorsValidation = require("../middlewares/doctorsValidation");
const AppointmentModel = require("../models/appointmentModel");

const doctorRoute = Router();

// Doctor Registration
doctorRoute.post("/register",doctorsValidation,validateUserRegistration, async (req, res) => {
    const { name, email, password, specialization, mode } = req.body;

    try {
        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).send({ msg: "Doctor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const doctor = new DoctorModel({
            name,
            email,
            password: hashedPassword,
            specialization,
            mode,
            ...req.body // Include other fields like address, availability, etc.
        });

        await doctor.save();
        res.status(201).send({ msg: "Doctor registered successfully" });

    } catch (error) {
        res.status(500).send({ msg: "Error registering doctor", error: error.message });
    }
});

// Doctor Login
doctorRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await DoctorModel.findOne({ email });
        if (!doctor) {
            return res.status(400).send({ msg: "Doctor not found" });
        }

        const match = password === doctor.password;
        if (!match) {
            return res.status(400).send({ msg: "Invalid password" });
        }

        const token = jwt.sign({ email: doctor.email, id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password: _pw, ...docSafe } = doctor.toObject();
        res.status(200).send({ msg: "Doctor logged in", docSafe, token });

    } catch (error) {
        res.status(500).send({ msg: "Error logging in doctor", error: error.message });
    }
});

// Get All Doctors (with optional filtering + sorting by soonest availability)
doctorRoute.get("/", async (req, res) => {
    try {
        const { specialization, mode, sortByAvailability } = req.query;
        let filter = {};

        if (specialization) {
            filter.specialization = specialization;
        }
        if (mode) {
            filter.mode = mode;
        }

        const doctors = await DoctorModel.find(filter).lean();
if (sortByAvailability === "true") {
  const now = new Date();
  // Fetch each doctor's next busy starts (confirmed OR reserved not expired)
  const busy = await AppointmentModel.aggregate([
    { $match: {
        doctorId: { $in: doctors.map(d => d._id) },
        $or: [
          { status: 'confirmed' },
          { status: 'reserved', reservationExpiresAt: { $gt: now } }
        ],
        'timeSlot.start': { $gte: now }
    }},
    { $group: { _id: '$doctorId', nextBusy: { $min: '$timeSlot.start' } } }
  ]);
  const busyMap = new Map(busy.map(b => [String(b._id), b.nextBusy]));

  // naive heuristic: if no busy soon, they're free now
  const withNextFree = doctors.map(d => ({
    ...d,
    nextFreeAt: busyMap.get(String(d._id)) || now
  }));
  withNextFree.sort((a, b) => new Date(a.nextFreeAt) - new Date(b.nextFreeAt));
  return res.status(200).send(withNextFree);
}

        res.status(200).send(doctors);

    } catch (error) {
        res.status(500).send({ msg: "Error fetching doctors", error: error.message });
    }
});

module.exports = doctorRoute;
