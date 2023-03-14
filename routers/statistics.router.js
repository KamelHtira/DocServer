const express = require('express');
const router = new express.Router();
const { currentMonthlyGain,totalProfit,barChart,currentMonthlyPatients,patientAges} = require("../controllers/statistics.controller");



router.use(express.json());
router.get("/currentmonthlygain",currentMonthlyGain);
router.get("/totalprofit",totalProfit);
router.post("/barchart",barChart);
router.get("/patientsage",patientAges);
router.get("/currentmonthlypatients",currentMonthlyPatients);





module.exports = router;