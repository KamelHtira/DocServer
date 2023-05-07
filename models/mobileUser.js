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
    settings: { type: {} },
    history: String,
  },
  { timestamps: true }
);

const MobileUser = mongoose.model("MobileUser", mobileUserSchema);
module.exports = MobileUser;
