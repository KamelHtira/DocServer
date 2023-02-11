const express = require("express");
const router = new express.Router();

const { exportPatients } = require("../controllers/export.controller")

router.get("/Patients", exportPatients);

module.exports = router;