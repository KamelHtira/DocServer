const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firsName: String,
  lastName: String,
  phone: String,
  birthDay: String,
  address: String,
  state: String,
  type: String,
  access: {dashboard:false,patient:false,transaction:false, setting:false, appointment:false}
});
const User = mongoose.model("User", userSchema);
module.exports = User;
