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

const getMedicalFilesByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    // Check if the 'ids' field is present in the request body
    if (!ids || !Array.isArray(ids)) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'ids' field must be an array of IDs." });
    }

    // Find medical files by array of IDs
    const medicalFiles = await MedicalFile.find({ _id: { $in: ids } });

    res.json(medicalFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMedicalFilesAndPatientCnamIdByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    // Check if the 'ids' field is present in the request body
    if (!ids || !Array.isArray(ids)) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'ids' field must be an array of IDs." });
    }

    // Find medical files by array of IDs
    const medicalFiles = await MedicalFile.find({ _id: { $in: ids } }).populate(
      {
        path: "patientId",
        select: "cnamId firstName lastName birthday", // Include other patient fields as needed
      }
    );

    // Extract the desired information for each result
    const extractedData = medicalFiles.map(({ patientId, createdAt }) => {
      if (patientId) {
        const { cnamId, firstName, lastName, birthday } = patientId;

        return {
          cnamId,
          firstName,
          lastName,
          birthday,
          medicalFileDate: createdAt,
        };
      }
    });

    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(400).json({
        error: "Both from and to dates are required in the query parameters.",
      });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({
        error:
          "Invalid date format. Please use ISO date format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ).",
      });
    }

    // Find medical files between the specified dates
    const medicalFiles = await MedicalFile.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    });

    // Extract patientIds from medicalFiles
    const patientIds = medicalFiles.map((file) => file.patientId);

    // Find patients based on patientIds
    const patients = await Patient.find({
      _id: { $in: patientIds },
      assuranceType: "FPUB",
    });

    // Create the final response object
    const result = medicalFiles.map((file) => {
      const patient = patients.find((patient) =>
        patient._id.equals(file.patientId)
      );

      return {
        medicalFileId: file._id,
        patientId: file.patientId,
        medicalFileDate: file.createdAt,
        firstName: patient ? patient.firstName : null,
        lastName: patient ? patient.lastName : null,
        birthday: patient ? patient.birthday : null,
        cnamId: patient ? patient.cnamId : null,
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
  getMedicalFilesByIds,
  getMedicalFilesAndPatientCnamIdByIds,
};
