const express = require("express");
const router = new express.Router();
const {
  currentMonthlyGain,
  totalProfit,
  barChart,
  currentMonthlyPatients,
  patientAges,
  confirmed_perentage,
} = require("../controllers/statistics.controller");


router.get("/currentmonthlygain", currentMonthlyGain);

router.get("/confirmedPerentage", confirmed_perentage);

router.get("/totalprofit", totalProfit);

router.post("/barchart", barChart);

router.get("/patientsage", patientAges);

router.get("/currentmonthlypatients", currentMonthlyPatients);

module.exports = router;
