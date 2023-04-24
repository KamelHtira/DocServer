const express = require("express");
const router = new express.Router();
const { mobileLogin } = require("../controllers/mobileLogin.controller");

router.post("/mobilelogin", mobileLogin);

module.exports = router;
