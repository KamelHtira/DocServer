const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  cnamId: String, //tn
  assuranceType: String, //tn FPUB FPRV FR
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  birthdayType: String,// S: specific , R: range, Y: year, 
  sexe: String,
  address: String,
  phone: String,
});
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
