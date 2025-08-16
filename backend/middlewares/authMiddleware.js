const jwt = require("jsonwebtoken");
// const BkModel = require("../models/bkModel");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // Check if token is blacklisted
    // const blacklisted = await BkModel.findOne({ token });
    // if (blacklisted) {
    //   return res.status(401).json({ msg: "Token expired or blacklisted. Please log in again." });
    // }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded info to req.user
    next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = auth;
