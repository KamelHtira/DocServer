const MedicalFile = require("../models/medicalFile");
const Patient = require("../models/patient");

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

const getAllMedicalFilesBetweenTwoDates = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: 'Both from and to dates are required in the query parameters.' });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please use ISO date format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ).' });
    }

    // Find medical files between the specified dates
    const medicalFiles = await MedicalFile.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    });

    // Extract patientIds from medicalFiles
    const patientIds = medicalFiles.map(file => file.patientId);

    // Find patients based on patientIds
    const patients = await Patient.find({ _id: { $in: patientIds } });

    // Create the final response object
    const result = medicalFiles.map(file => {
      const patient = patients.find(patient => patient._id.equals(file.patientId));

      return {
        medicalFileId: file._id,
        patientId: file.patientId,
        medicalFileDate: file.createdAt,
        firstName: patient ? patient.firstName : null,
        lastName: patient ? patient.lastName : null,
        birthday: patient ? patient.birthday : null,
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
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
  getAllMedicalFilesBetweenTwoDates,
};
