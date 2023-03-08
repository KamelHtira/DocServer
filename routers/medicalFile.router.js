const express = require("express");
const router = new express.Router();
const {
  createMedicalFile,
  getAllMedicalFiles,
  getMedicalFileById,
  updateMedicalFile,
  deleteMedicalFile,
  deleteMedicalFiles,
} = require("../controllers/medicalFile.controller");

router.use(express.json());

router.post("/medicalFiles", createMedicalFile);

router.get("/medicalFiles", getAllMedicalFiles);

router.get("/medicalFiles/:id", getMedicalFileById);

router.patch("/medicalFiles/:id", updateMedicalFile);

router.delete("/medicalFiles/:id", deleteMedicalFile);

router.delete("/medicalFiles", deleteMedicalFiles);

module.exports = router;
