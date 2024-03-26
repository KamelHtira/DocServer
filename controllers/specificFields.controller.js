const SpecificFields = require("../models/specifcFields");

const createSpecificField = async (req, res) => {
  const newSpecificFields = new SpecificFields(req.body);
  try {
    await newSpecificFields.save();
    res.status(201).send(newSpecificFields);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllSpecificFields = async (req, res) => {
  try {
    const SpecificFieldss = await SpecificFields.find({});
    res.send(SpecificFieldss);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSpecificFieldsById = async (req, res) => {
  try {
    const SpecificFieldsToShow = await SpecificFields.findById(req.params.id);
    if (!SpecificFieldsToShow) {
      return res.status(404).send();
    }
    res.send(SpecificFieldsToShow);   
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateSpecificField = async (req, res) => {
  try {
    const specificFieldsToUpdate = await SpecificFields.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!specificFieldsToUpdate) {
      return res.status(404).send();
    }
    res.send(specificFieldsToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteSpecificField = async (req, res) => {
  try {
    const specificFieldsToDelete = await SpecificFields.findByIdAndDelete(
      req.params.id
    );
    if (!specificFieldsToDelete) {
      return res.status(404).send();
    }
    res.send(specificFieldsToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteSpecificFields = async (req, res) => {
  try {
    const deletedSpecificFieldss = await SpecificFields.deleteMany({
      _id: { $in: req.body.specificFieldsIds },
    });
    res.status(200).json({
      message: "SpecificFieldss deleted successfully",
      deletedSpecificFieldss,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete specificFieldss", error });
  }
};

module.exports = {
  createSpecificField,
  getAllSpecificFields,
  getSpecificFieldsById,
  updateSpecificField,
  deleteSpecificFields,
  deleteSpecificField,
};
