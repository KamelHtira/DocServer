const express = require("express");
const router = new express.Router();

const { exportPatients } = require("../controllers/export.controller")

router.post("/download", exportPatients);

module.exports = router;