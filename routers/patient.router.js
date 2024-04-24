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
  addCustomField,
  getCustomFields,
  deleteCustomField,
  addAllergy,
  getAllergies,
  deleteAllergy,
  updateAllergy,
  addMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicines,
} = require("../controllers/patients.controller");

router.delete("/patients/specificField", deleteCustomField);

router.post("/patients", createPatient);

router.get("/patients", getAllPatients);

router.get("/patients/next", getNextPatient);

router.get("/patients/prec", getPreviousPatient);

router.get("/patients/:id", getPatientById);

router.patch("/patients/:id", updatePatient);

router.delete("/patients/:id", deletePatient);

router.delete("/patients", deletePatients);

router.post("/patients/specificField", addCustomField);

router.get("/patients/specificField/:id", getCustomFields);

// allergy

router.post("/patients/allergies/add", addAllergy);

router.patch("/patients/allergies/update", updateAllergy);

router.get("/patients/allergies/:id", getAllergies);

router.delete("/patients/allergies/delete", deleteAllergy);

// medicine

router.post("/patients/medicines/add", addMedicines);

router.patch("/patients/medicines/update", updateMedicine);

router.get("/patients/medicines/:id", getMedicines);

router.delete("/patients/medicines/delete", deleteMedicine);

module.exports = router;
