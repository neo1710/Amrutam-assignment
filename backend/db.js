const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8080;
// mongoDB connection string
const db = mongoose.connect(`${process.env.MONGODB_DATABASE_URI}`)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log("Database connection error:", err));

module.exports = { db, port };