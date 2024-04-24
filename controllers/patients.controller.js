const Patient = require("../models/patient");
const MedicalHistory = require("../models/medicalHistory");

const createPatient = async (req, res) => {
  console.log(req.body);
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
    console.log(error);
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

const addCustomField = async (req, res) => {
  try {
    const { patientId, customField } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {
        $push: {
          customFields: customField,
        },
      },
      { new: true }
    );

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding custom field" });
  }
};

const addAllergy = async (req, res) => {
  try {
    const { patientId, allergy } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {
        $push: {
          allergies: allergy,
        },
      },
      { new: true }
    );

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding allergy" });
  }
};

const addMedicines = async (req, res) => {
  try {
    const { patientId, medicine } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {
        $push: {
          medicines: medicine,
        },
      },
      { new: true }
    );

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding medicine" });
  }
};

const deleteAllergy = async (req, res) => {
  try {
    const { patientId, allergy } = req.body;
    // // Validate data (optional)
    if (!patientId || !allergy) {
      return res
        .status(400)
        .json({ message: "Missing patientId or allergy in request body" });
    }

    // Fetch all allergies for the patient
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const allergies = patient.allergies; // Assuming allergies is an array property
    // Filter out the allergy to be deleted (optimized for loop)
    const filteredAllergies = allergies.filter((a) => a.name !== allergy);

    // Update patient with filtered allergies (if necessary)
    if (allergies.length !== filteredAllergies.length) {
      // Check if any allergy was removed
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        { allergies: filteredAllergies },
        { new: true } // Return updated document
      );
      return res.json({ patient: updatedPatient });
    } else {
      return res.json({ message: "Allergy not found" }); // Inform client if no allergy was removed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting allergy" });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const { patientId, medicine } = req.body;
    // // Validate data (optional)
    if (!patientId || !medicine) {
      return res
        .status(400)
        .json({ message: "Missing patientId or medicine in request body" });
    }

    // Fetch all medicines for the patient
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicines = patient.medicines; // Assuming medicines is an array property
    // Filter out the allergy to be deleted (optimized for loop)
    const filteredMedicines = medicines.filter((a) => a.name !== medicine);

    // Update patient with filtered allergies (if necessary)
    if (medicines.length !== filteredMedicines.length) {
      // Check if any allergy was removed
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        { medicines: filteredMedicines },
        { new: true } // Return updated document
      );
      return res.json({ patient: updatedPatient });
    } else {
      return res.json({ message: "medicine not found" }); // Inform client if no allergy was removed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting medicine" });
  }
};

const updateAllergy = async (req, res) => {
  try {
    const { patientId, allergy } = req.body;

    // Validate data (optional)
    if (
      !patientId ||
      !allergy ||
      !allergy.name ||
      !allergy.startDate ||
      !allergy.endDate
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in allergy object" });
    }

    // Fetch all allergies for the patient
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const allergies = patient.allergies; // Assuming allergies is an array property

    // Find the allergy to be updated (optimized for loop)
    const allergyIndex = allergies.findIndex((a) => a.name === allergy.name);

    // Check if allergy is found
    if (allergyIndex === -1) {
      return res.status(404).json({ message: "Allergy not found" });
    }

    // Update allergy details
    allergies[allergyIndex] = allergy; // Replace existing allergy object with updated one

    // Update patient with modified allergies
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { allergies: allergies },
      { new: true } // Return updated document
    );

    res.json({ patient: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating allergy" });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const { patientId, medicine } = req.body;

    // Validate data (optional)
    if (
      !patientId ||
      !medicine ||
      !medicine.name ||
      !medicine.startDate ||
      !medicine.endDate
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in medicine object" });
    }

    // Fetch all medicines for the patient
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicines = patient.medicines; // Assuming medicines is an array property

    // Find the medicine to be updated (optimized for loop)
    const medicineIndex = medicines.findIndex((a) => a.name === medicine.name);

    // Check if medicine is found
    if (medicineIndex === -1) {
      return res.status(404).json({ message: "Allergy not found" });
    }

    // Update medicine details
    medicines[medicineIndex] = medicine; // Replace existing medicine object with updated one

    // Update patient with modified medicines
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { medicines: medicines },
      { new: true } // Return updated document
    );

    res.json({ patient: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating allergy" });
  }
};

const getCustomFields = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ customFields: patient.customFields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting custom fields" });
  }
};

const getAllergies = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ allergies: patient.allergies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting allergies" });
  }
};

const getMedicines = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json({ medicines: patient.medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting medicines" });
  }
};

const deleteCustomField = async (req, res) => {
  try {
    const { patientId, fieldName } = req.body;

    // Validate data (optional)
    if (!patientId || !fieldName) {
      return res
        .status(400)
        .json({ message: "Missing patientId or fieldName in request body" });
    }

    // Fetch the patient document
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const customFields = patient.customFields; // Assuming customFields is an array property

    // Filter out the custom field to be deleted (optimized for loop)
    const filteredCustomFields = customFields.filter(
      (field) => field.name !== fieldName
    );

    // Update patient with filtered custom fields (if necessary)
    if (customFields.length !== filteredCustomFields.length) {
      // Check if any field was removed
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        { customFields: filteredCustomFields },
        { new: true } // Return updated document
      );
      return res.json({
        patient: updatedPatient,
        message: "Custom field deleted successfully",
      });
    } else {
      return res.json({ message: "Custom field not found" }); // Inform client if no field was removed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting custom field" });
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
  addCustomField,
  getCustomFields,
  deleteCustomField,
  getAllergies,
  addAllergy,
  deleteAllergy,
  updateAllergy,
  getMedicines,
  addMedicines,
  deleteMedicine,
  updateMedicine,
};
