const mongoose = require("mongoose");
const { getCurrentDateTime } = require("../utils/functions");

const appointment = mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  createdAt: { type: String, default: getCurrentDateTime() },
  appointmentDate: String,
  description: String,
  phone: String,
  type: String,
  sexe: String,
});

module.exports = appointment;
