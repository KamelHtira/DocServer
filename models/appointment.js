const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  createdAt: String,
  appointmentDate: String,
  description: String,
  phone: String,
  initialType: String,
  type: String,
  sexe: String,
  isPaid: { type: Boolean, default: false },
  amount: Number,
  
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
