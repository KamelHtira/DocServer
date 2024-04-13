const express = require("express");
const router = new express.Router();

const {
  deleteAllergie,
  createAllergie,
  getAllAllergies,
  getAllergiesById,
  updateAllergie,
  deleteAllergies,
} = require("../controllers/allergies.controller");

router.post("/allergies", createAllergie);

router.get("/allergies", getAllAllergies);

router.get("/allergie/:id", getAllergiesById);

router.patch("/allergie/:id", updateAllergie);

// router.delete("/allergie/:id", deleteAllergie);

router.delete("/allergies", deleteAllergies);

module.exports = router;
