const mongoose = require("mongoose");

const medicalFileSchema = mongoose.Schema({
  patientID: String,
  customFields: {},
  title: String,
  description: String,
  date: String,
},{timestamps: true });

const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
module.exports = MedicalFile;
