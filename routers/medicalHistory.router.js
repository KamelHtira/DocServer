const express = require("express");
const router = new express.Router();
const {
  createMedicalHistory,
  getAllMedicalHistorys,
  getMedicalHistoryById,
  updateMedicalHistory,
  deleteMedicalHistory,
  deleteMedicalHistorys,
  getMedicalHistoryByPatientId,
  deleteMedicalHistoryByPatientId
} = require("../controllers/medicalHistory.controller");


router.post("/medicalHistorys", createMedicalHistory);

router.get("/medicalHistorys", getAllMedicalHistorys);

router.get("/medicalHistorys/:id", getMedicalHistoryById);

router.get("/medicalHistorys/:id", getMedicalHistoryById);

router.patch("/medicalHistorys/:id", updateMedicalHistory);

router.get("/medicalHistorys/patient/:id", getMedicalHistoryByPatientId);

router.delete("/medicalHistorys/:id", deleteMedicalHistory);

router.delete("/medicalHistorys/patient/:id", deleteMedicalHistoryByPatientId);

router.delete("/medicalHistorys", deleteMedicalHistorys);

module.exports = router;
