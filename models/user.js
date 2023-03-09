const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  birthday: String,
  address: String,
  state: String,
  type: String,
  customFields: { type: [] },
  settings: { type: {} },
  access: {
    type: {},
    default: {
      dashboard: false,
      patient: false,
      transaction: false,
      setting: false,
      appointment: false,
    },
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
