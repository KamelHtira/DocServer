const express = require('express');
const router = new express.Router();
const { currentMonthlyGain,totalProfit,barChart,currentMonthlyPatients} = require("../controllers/statistics.controller");



router.use(express.json());
router.get("/currentmonthlygain",currentMonthlyGain);
router.get("/totalprofit",totalProfit);
router.get("/barchart",barChart);
router.get("/currentmonthlypatients",currentMonthlyPatients);





module.exports = router;