const mongoose = require("mongoose");

const medicalHistorySchema = mongoose.Schema(
  {
    patientId: String,
    address: String,
    title: String,
    description: String,
    date:String
  },
  { timestamps: true }
);

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);
module.exports = MedicalHistory;
