const Allergies = require("../models/specifcFields");

const createAllergie = async (req, res) => {
  const newAllergies = new Allergies(req.body);
  try {
    await newAllergies.save();
    res.status(201).send(newAllergies);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAllergies = async (req, res) => {
  try {
    const Allergiess = await Allergies.find({});
    res.send(Allergiess);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllergiesById = async (req, res) => {
  try {
    const AllergiesToShow = await Allergies.findById(req.params.id);
    if (!AllergiesToShow) {
      return res.status(404).send();
    }
    res.send(AllergiesToShow);   
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAllergie = async (req, res) => {
  try {
    const allergiesToUpdate = await Allergies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!allergiesToUpdate) {
      return res.status(404).send();
    }
    res.send(allergiesToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAllergie = async (req, res) => {
  try {
    const allergiesToDelete = await Allergies.findByIdAndDelete(
      req.params.id
    );
    if (!allergiesToDelete) {
      return res.status(404).send();
    }
    res.send(allergiesToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteAllergies = async (req, res) => {
  try {
    const deletedAllergiess = await Allergies.deleteMany({
      _id: { $in: req.body.allergiesIds },
    });
    res.status(200).json({
      message: "Allergiess deleted successfully",
      deletedAllergiess,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete allergiess", error });
  }
};

module.exports = {
  createAllergie,
  getAllAllergies,
  getAllergiesById,
  updateAllergie,
  deleteAllergies,
  deleteAllergie,
};
