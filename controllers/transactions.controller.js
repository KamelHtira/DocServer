const mongoose = require('mongoose');
const transactionSchema = require('../models/transaction')
const Transaction = mongoose.model('Transaction', transactionSchema);

const createTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  try {
    await newTransaction.save();
    res.status(201).send(newTransaction);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const Transactions = await Transaction.find({});
    res.send(Transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTransactionById = async (req, res) => {
  try {
    const Transaction = await Transaction.findById(req.params.id);
    if (!Transaction) {
      return res.status(404).send();
    }
    res.send(Transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionToUpdate = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!transactionToUpdate) {
      return res.status(404).send();
    }
    res.send(transactionToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionToDelete = await Transaction.findByIdAndDelete(req.params.id);
    if (!transactionToDelete) {
      return res.status(404).send();
    }
    res.send(transactionToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteTransactions = async (req, res) => {
  try {
    const deletedTransactions = await Transaction.deleteMany({
      _id: { $in: req.body.transactionIds }
    });
    res.status(200).json({ message: 'Transactions deleted successfully', deletedTransactions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transactions', error });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  deleteTransactions
};