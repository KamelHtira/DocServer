const mongoose = require("mongoose");

const allergiesSchema = mongoose.Schema(
  {
    name: String,
    startDate: String, 
    endDate: String,
  },
  { timestamps: true }
);
const Allergies = mongoose.model("Allergies", allergiesSchema);
module.exports = Allergies;
