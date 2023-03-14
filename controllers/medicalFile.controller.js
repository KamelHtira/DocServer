const MedicalFile = require("../models/medicalFile");

const createMedicalFile = async (req, res) => {
  const newMedicalFile = new MedicalFile(req.body);
  try {
    await newMedicalFile.save();
    res.status(201).send(newMedicalFile);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllMedicalFiles = async (req, res) => {
  try {
    const medicalFiles = await MedicalFile.find({});
    res.send(medicalFiles);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedicalFileById = async (req, res) => {
  try {
    const MedicalFileToShow = await MedicalFile.findById(req.params.id);
    if (!MedicalFileToShow) {
      return res.status(404).send();
    }
    res.send(MedicalFileToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedicalFileByPatientId = async (req, res) => {
  try {
    const MedicalFileToShow = await MedicalFile.find({
      patientId: req.params.id,
    });
    if (!MedicalFileToShow) {
      return res.status(404).send();
    }
    res.send(MedicalFileToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMedicalFile = async (req, res) => {
  try {
    const medicalFileToUpdate = await MedicalFile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicalFileToUpdate) {
      return res.status(404).send();
    }
    res.send(medicalFileToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteMedicalFile = async (req, res) => {
  try {
    const medicalFileToDelete = await MedicalFile.findByIdAndDelete(
      req.params.id
    );
    if (!medicalFileToDelete) {
      return res.status(404).send();
    }
    res.send(medicalFileToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMedicalFiles = async (req, res) => {
  try {
    const deletedMedicalFiles = await MedicalFile.deleteMany({
      _id: { $in: req.body.medicalFileIds },
    });
    res.status(200).json({
      message: "MedicalFiles deleted successfully",
      deletedMedicalFiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicalFiles", error });
  }
};

module.exports = {
  createMedicalFile,
  getAllMedicalFiles,
  getMedicalFileById,
  updateMedicalFile,
  deleteMedicalFile,
  deleteMedicalFiles,
  getMedicalFileByPatientId,
};
