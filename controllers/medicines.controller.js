const Medicines = require("../models/medicines");

const createAllergie = async (req, res) => {
  const newMedicines = new Medicines(req.body);
  try {
    await newMedicines.save();
    res.status(201).send(newMedicines);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const Mediciness = await Medicines.find({});
    res.send(Mediciness);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedicinesById = async (req, res) => {
  try {
    const MedicinesToShow = await Medicines.findById(req.params.id);
    if (!MedicinesToShow) {
      return res.status(404).send();
    }
    res.send(MedicinesToShow);   
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAllergie = async (req, res) => {
  try {
    const medicinesToUpdate = await Medicines.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicinesToUpdate) {
      return res.status(404).send();
    }
    res.send(medicinesToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAllergie = async (req, res) => {
  try {
    const medicinesToDelete = await Medicines.findByIdAndDelete(
      req.params.id
    );
    if (!medicinesToDelete) {
      return res.status(404).send();
    }
    res.send(medicinesToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteMedicines = async (req, res) => {
  try {
    const deletedMediciness = await Medicines.deleteMany({
      _id: { $in: req.body.medicinesIds },
    });
    res.status(200).json({
      message: "Mediciness deleted successfully",
      deletedMediciness,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete mediciness", error });
  }
};

module.exports = {
  createAllergie,
  getAllMedicines,
  getMedicinesById,
  updateAllergie,
  deleteMedicines,
  deleteAllergie,
};
