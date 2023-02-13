const mongoose = require("mongoose");
const patientSchema = require("../models/patient");
const Patient = mongoose.model("Patient", patientSchema);

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
    const Patient = await Patient.findById(req.params.id);
    if (!Patient) {
      return res.status(404).send();
    }
    res.send(Patient);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePatient = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

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
