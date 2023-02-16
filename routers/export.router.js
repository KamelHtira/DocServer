const express = require("express");
const router = new express.Router();

const { sendData, downloadData } = require("../controllers/export.controller")

router.post("/download", sendData);
router.get("/download/:filename", downloadData);

module.exports = router;