const express = require("express");
const router = new express.Router();

const {
  deleteMedicine,
  createMedicine,
  getAllMedicines,
  getMedicinesById,
  updateMedicine,
  deleteMedicines,
} = require("../controllers/medicines.controller");

router.post("/medicines", createMedicine);

router.get("/medicines", getAllMedicines);

router.get("/allergie/:id", getMedicinesById);

router.patch("/allergie/:id", updateMedicine);

// router.delete("/allergie/:id", deleteMedicine);

router.delete("/medicines", deleteMedicines);

module.exports = router;
