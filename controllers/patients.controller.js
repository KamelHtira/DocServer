const Patient = require("../models/patient");

const createPatient = async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    await newPatient.save();
    res.status(201).send(newPatient);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const Patients = await Patient.find({});
    res.send(Patients);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientById = async (req, res) => {
  try {
    const PatientToShow = await Patient.findById(req.params.id);
    if (!PatientToShow) {
      return res.status(404).send();
    }
    res.send(PatientToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePatient = async (req, res) => {
  try {
    const patientToUpdate = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!patientToUpdate) {
      return res.status(404).send();
    }
    res.send(patientToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientToDelete = await Patient.findByIdAndDelete(req.params.id);
    if (!patientToDelete) {
      return res.status(404).send();
    }
    res.send(patientToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deletePatients = async (req, res) => {
  try {
    const deletedPatients = await Patient.deleteMany({
      _id: { $in: req.body.patientIds },
    });
    res
      .status(200)
      .json({ message: "Patients deleted successfully", deletedPatients });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete patients", error });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,

  deletePatients,
};
