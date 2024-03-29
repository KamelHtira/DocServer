const express = require("express");
const router = new express.Router();
const {
  createMedicalFile,
  getAllMedicalFiles,
  getMedicalFileById,
  updateMedicalFile,
  deleteMedicalFile,
  deleteMedicalFiles,
  getMedicalFileByPatientId,
  getAllMedicalFilesBetweenTwoDates,
  getMedicalFilesAndPatientCnamIdByIds,
} = require("../controllers/medicalFile.controller");


router.post("/medicalFiles", createMedicalFile);

router.get("/medicalFiles", getAllMedicalFiles);

router.get("/medicalFiles/:id", getMedicalFileById);

router.patch("/medicalFiles/:id", updateMedicalFile);

router.get("/medicalFiles/patient/:id", getMedicalFileByPatientId);

router.post("/medicalFiles/cnamId", getMedicalFilesAndPatientCnamIdByIds);

router.get("/medicalFiles/report/get-dates", getAllMedicalFilesBetweenTwoDates);

router.delete("/medicalFiles/:id", deleteMedicalFile);

router.delete("/medicalFiles", deleteMedicalFiles);

module.exports = router;
