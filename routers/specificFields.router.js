const express = require("express");
const router = new express.Router();

const {
  deleteSpecificField,
  createSpecificField,
  getAllSpecificFields,
  getSpecificFieldsById,
  updateSpecificField,
  deleteSpecificFields,
} = require("../controllers/specificFields.controller");

router.post("/specificFields", createSpecificField);

router.get("/specificFields", getAllSpecificFields);

router.get("/specificField/:id", getSpecificFieldsById);

router.patch("/specificField/:id", updateSpecificField);

// router.delete("/specificField/:id", deleteSpecificField);

router.delete("/specificFields", deleteSpecificFields);

module.exports = router;
