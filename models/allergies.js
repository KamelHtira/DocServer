const mongoose = require("mongoose");

const allergiesSchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);
const Allergies = mongoose.model("Allergies", allergiesSchema);
module.exports = Allergies;
