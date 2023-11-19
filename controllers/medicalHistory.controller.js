const MedicalHistory = require("../models/medicalHistory");

const createMedicalHistory = async (req, res) => {
  const newMedicalHistory = new MedicalHistory(req.body);
  try {
    await newMedicalHistory.save();
    res.status(201).send(newMedicalHistory);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllMedicalHistorys = async (req, res) => {
  try {
    const medicalHistorys = await MedicalHistory.find({});
    res.send(medicalHistorys);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedicalHistoryById = async (req, res) => {
  try {
    const MedicalHistoryToShow = await MedicalHistory.findById(req.params.id);
    if (!MedicalHistoryToShow) {
      return res.status(404).send();
    }
    res.send(MedicalHistoryToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedicalHistoryByPatientId = async (req, res) => {
  try {
    const MedicalHistoryToShow = await MedicalHistory.find({
      patientId: req.params.id,
    });
    if (!MedicalHistoryToShow) {
      return res.status(404).send();
    }

    res.send(MedicalHistoryToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMedicalHistory = async (req, res) => {
  try {
    const medicalHistoryToUpdate = await MedicalHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicalHistoryToUpdate) {
      return res.status(404).send();
    }
    res.send(medicalHistoryToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteMedicalHistory = async (req, res) => {
  try {
    const medicalHistoryToDelete = await MedicalHistory.findByIdAndDelete(
      req.params.id
    );

    if (!medicalHistoryToDelete) {
      return res.status(500).send();
    }
    res.send(medicalHistoryToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMedicalHistorys = async (req, res) => {
  try {
    const deletedMedicalHistorys = await MedicalHistory.deleteMany({
      _id: { $in: req.body.medicalHistoryIds },
    });
    res.status(200).json({
      message: "MedicalHistorys deleted successfully",
      deletedMedicalHistorys,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicalHistorys", error });
  }
};

const deleteMedicalHistoryByPatientId = async (req, res) => {
  try {
    const deletedMedicalHistorys = await MedicalHistory.deleteMany({
      patientId: req.params.id,
    });
    res.status(200).json({
      message: "MedicalHistorys deleted successfully",
      deletedMedicalHistorys,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicalHistorys", error });
  }
};

module.exports = {
  createMedicalHistory,
  getAllMedicalHistorys,
  getMedicalHistoryById,
  updateMedicalHistory,
  deleteMedicalHistory,
  deleteMedicalHistorys,
  getMedicalHistoryByPatientId,
  deleteMedicalHistoryByPatientId
};
