const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  patientId: String,
  firstName: String,
  lastName: String,
  birthday: String,
  createdAt: String,
  initialType: String,
  appointmentDate: String,
  description: String,
  phone: String,
  type: String,
  queuedDate: String,
  sexe: String,
  isPaid: { type: Boolean, default: false },
  amount: Number,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
