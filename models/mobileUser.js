const mongoose = require("mongoose");

const mobileUserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    sexe: String,
    email: String,
    password: String,
    phone: String,
    birthday: String,
    address: String,
    state: String,
    settings: { type: {} },
  },
  { timestamps: true }
);

const MobileUser = mongoose.model("MobileUser", mobileUserSchema);
module.exports = MobileUser;
