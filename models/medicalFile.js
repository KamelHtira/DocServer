const mongoose = require("mongoose");

const medicalFileSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    customFields: {},
    title: String,
    amount: Number,
    description: String,
    assuranceType: String, //tn FPUB FPRV FR
    cnamStatus: { type: String, default: "P" }, //tn E : Exported, P : Pending, A : Added to current slip
  },
  { timestamps: true }
);

const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
module.exports = MedicalFile;
