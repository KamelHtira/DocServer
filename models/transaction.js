const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  amount: Number,
  description: String,
  type: String,
  date: String, // DD/MM/YYYY
},{timestamps: true });
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
