const mongoose = require("mongoose");

const specificFieldsSchema = mongoose.Schema(
  {
    name: String,
    type: String, // Radio , Input , Checkbox
    options: [],
  },
  { timestamps: true }
);
const SpecificFields = mongoose.model("SpecificFields", specificFieldsSchema);
module.exports = SpecificFields;
