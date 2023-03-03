const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller");




router.use(express.json());


router.post("/signup",createUser);




module.exports = router;




