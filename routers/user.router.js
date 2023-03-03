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
} = require("../controllers/user.controller");

router.use(express.json());

router.post("/Users", createUser);

router.get("/Users", getAllUsers);

router.get("/Users/:id", getUserById);

router.patch("/Users/:id", updateUser);

router.patch("/Password/:id", updatePassword);

router.delete("/Users/:id", deleteUser);

router.delete("/Users", deleteUsers);

module.exports = router;
