const express = require("express");
const router = express.Router();
const {signup} = require("../controllers/signup.controller");



router.use(express.json());


router.post("/signup",signup);




module.exports = router;




