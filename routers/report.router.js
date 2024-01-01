const express = require("express");
const router = new express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  deleteReports,
  getReportByPatientId,
  createCnamReport,
} = require("../controllers/report.controller");

router.post("/reports", createReport);

router.post("/reports/cnam", createCnamReport);

router.get("/reports", getAllReports);

router.get("/reports/:id", getReportById);

router.get("/reports/:id", getReportById);

router.patch("/reports/:id", updateReport);

router.get("/reports/patient/:id", getReportByPatientId);

router.delete("/reports/:id", deleteReport);

router.delete("/reports", deleteReports);

module.exports = router;
