const express = require("express");
const router = new express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteUsers,
  updatePassword,
  getUserCustomFieldsById,
  getAllSubusers,
  addMedicalFileToUser,
  getUserCnamSlipById,
  resetUserCnamSlip,
} = require("../controllers/user.controller");

router.post("/Users", createUser);

router.post("/Users/medicalFile/:userId", addMedicalFileToUser);

router.get("/Users", getAllUsers);

router.get("/Subusers", getAllSubusers);

router.get("/Users/:id", getUserById);

router.get("/Users/customFields/:id", getUserCustomFieldsById);

router.get("/Users/currentMedicalFilesSlip/:id", getUserCnamSlipById);

router.patch("/Users/:id", updateUser);

router.patch("/Users/reset-cnam-slip/:id", resetUserCnamSlip);

router.patch("/Password/:id", updatePassword);

router.delete("/Users/:id", deleteUser);

router.delete("/Users", deleteUsers);

module.exports = router;
