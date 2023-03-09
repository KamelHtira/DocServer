const mongoose = require("mongoose");

const medicalFileSchema = mongoose.Schema({
  patientID: String,
  check: {

    temperature: String,
    height: String,
    weight: String,
    oxygenLevel: String,
    bloodPressure: String,
    heartRate: String,
    ears: String,
    eyes: String,
    throat: String,
},
  title: String,
  description: String,
  date: String,
},{timestamps: true });

const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
module.exports = MedicalFile;
