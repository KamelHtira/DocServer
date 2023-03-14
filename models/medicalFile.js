const mongoose = require("mongoose");

const medicalFileSchema = mongoose.Schema(
  {
    patientId: String,
    customFields: {},
    title: String,
    description: String,
  },
  { timestamps: true }
);

const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
module.exports = MedicalFile;
