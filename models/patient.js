const mongoose = require("mongoose");

const patient = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  Sexe: String,
  address: String,
  phone: String,
});

module.exports = patient;
