const express = require("express");
const router = new express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  deletePatients,
  getNextPatient,
  getPreviousPatient,
} = require("../controllers/patients.controller");

router.post("/patients", createPatient);

router.get("/patients", getAllPatients);

router.get("/patients/next", getNextPatient);

router.get("/patients/prec", getPreviousPatient);

router.get("/patients/:id", getPatientById);

router.patch("/patients/:id", updatePatient);

router.delete("/patients/:id", deletePatient);

router.delete("/patients", deletePatients);

module.exports = router;
