const express = require("express");
const router = new express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  deleteTransactions,
} = require("../controllers/transactions.controller");

router.use(express.json());

router.post("/transactions", createTransaction);

router.get("/transactions", getAllTransactions);

router.get("/transactions/:id", getTransactionById);

router.patch("/transactions/:id", updateTransaction);

router.delete("/transactions/:id", deleteTransaction);

router.delete("/transactions", deleteTransactions);

module.exports = router;
