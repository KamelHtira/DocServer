const Patient = require("../models/patient");
const MedicalHistory = require("../models/medicalHistory");

const createPatient = async (req, res) => {
  const { medicalHistories, ...patient } = req.body;

  try {
    // Create a new patient instance
    const newPatient = new Patient(patient);

    // Save the patient to MongoDB
    await newPatient.save();

    // Get the newly created patient's ID
    const patientId = newPatient._id;

    // Update the medical histories array with the patientId field
    const medicalHistoriesWithPatientId = medicalHistories.map((history) => ({
      ...history,
      patientId: patientId,
    }));

    // Save the medical histories to MongoDB
    await MedicalHistory.insertMany(medicalHistoriesWithPatientId);

    // Attach the patientId to the response
    const response = {
      ...newPatient.toObject(),
      medicalHistories: medicalHistoriesWithPatientId,
    };

    res.status(201).send(response);
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

const getPreviousPatient = async (req, res) => {
  try {
    const { currentPatientCreatedAt } = req.query;
    console.log(currentPatientCreatedAt);
    // Find the current patient
    const currentPatient = await Patient.findOne({
      createdAt: currentPatientCreatedAt,
    }).lean();
    console.log(currentPatient);
    if (!currentPatient) {
      return res.status(404).json({ error: "Current patient not found" });
    }

    // Find the previous patient
    const previousPatient = await Patient.findOne({
      createdAt: { $lt: currentPatient.createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();
    console.log(previousPatient);
    res.json(previousPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNextPatient = async (req, res) => {
  try {
    const { currentPatientCreatedAt } = req.query;

    // Find the current patient
    const currentPatient = await Patient.findOne({
      createdAt: currentPatientCreatedAt,
    }).lean();

    if (!currentPatient) {
      return res.status(404).json({ error: "Current patient not found" });
    }

    // Find the next patient
    const nextPatient = await Patient.findOne({
      createdAt: { $gt: currentPatient.createdAt },
    })
      .sort({ createdAt: 1 })
      .limit(1)
      .lean();

    res.json(nextPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  deletePatients,
  getPreviousPatient,
  getNextPatient,
};
