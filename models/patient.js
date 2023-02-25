const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  sexe: String,
  address: String,
  phone: String,
});
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
