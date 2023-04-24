const express = require("express");
const router = new express.Router();
const {
  createMobileUser,
  getAllMobileUsers,
  getMobileUserById,
  updateMobileUser,
  deleteMobileUser,
  deleteMobileUsers,
  updatePassword,
} = require("../controllers/mobileUser.controller");

router.post("/MobileUsers", createMobileUser);

router.get("/MobileUsers", getAllMobileUsers);

router.get("/MobileUsers/:id", getMobileUserById);

router.patch("/MobileUsers/:id", updateMobileUser);

router.patch("/mobilePassword/:id", updatePassword);

router.delete("/MobileUsers/:id", deleteMobileUser);

router.delete("/MobileUsers", deleteMobileUsers);

module.exports = router;
