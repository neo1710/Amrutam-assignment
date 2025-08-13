const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
const UserModel = require("../models/userModel");
const validateUserRegistration = require("../middlewares/validationMiddleware");

const userRoute = Router();

// Register
userRoute.post("/register", validateUserRegistration, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    bcrypt.hash(password, 5, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ msg: "Error hashing password" });
      }
      const user = new UserModel({ name, email, password: hashed });
      await user.save();
      res.status(201).json({ msg: "User registered successfully" });
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Login
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ msg: "Error checking password" });
      }
      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Remove password before sending user data
      const { password: _, ...userData } = user.toObject();
      res.status(200).json({
        msg: "User logged in successfully",
        user: userData,
        token
      });
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = userRoute;