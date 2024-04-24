const mongoose = require("mongoose");

const medicinesSchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);
const Medicines = mongoose.model("Medicines", medicinesSchema);
module.exports = Medicines;
