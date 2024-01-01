const User = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const MedicalFile = require("../models/medicalFile");

const createUser = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    birthday: req.body.birthday,
    address: req.body.address,
    state: req.body.state,
    type: req.body.type,
    settings: req.body.settings,
    customFields: req.body.customFields,
    access: req.body.access,
  });

  user
    .save()
    .then((user) => {
      res.send({
        success: true,
        message: "User created successfully.",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.send(Users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllSubusers = async (req, res) => {
  try {
    const Users = await User.find({ type: "subuser" });
    res.send(Users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const UserToShow = await User.findById(req.params.id);
    if (!UserToShow) {
      return res.status(404).send();
    }
    res.send(UserToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserCustomFieldsById = async (req, res) => {
  try {
    const customFields = await User.findById(req.params.id, "customFields");
    if (!customFields) {
      return res.status(404).send();
    }
    res.send(customFields);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserCnamSlipById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the user with the 'currentMedicalFilesSlip' field
    const user = await User.findById(
      userId,
      "currentMedicalFilesSlip currentMedicalFilesSlipStartDate"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract medical file IDs from 'currentMedicalFilesSlip'
    const medicalFileIds = user.currentMedicalFilesSlip;

    // Fetch details for each medical file
    const patientDetails = await Promise.all(
      medicalFileIds.map(async (medicalFileId) => {
        // Fetch the medical file with additional fields
        const medicalFile = await MedicalFile.findById(
          medicalFileId,
          "patientId createdAt amount" // Add 'amount' to fetch from MedicalFile
        ).populate("patientId", "firstName lastName birthday cnamId");


        if (!medicalFile || !medicalFile.patientId) {
          return null; // Medical file not found, you can handle this case accordingly
        }

        // Extract relevant information

        const { firstName, lastName, birthday, cnamId } = medicalFile.patientId;

        return {
          firstName,
          lastName,
          birthday,
          cnamId,
          createdAt: medicalFile.createdAt,
          amount: medicalFile.amount, // Include 'amount' in the response
        };
      })
    );

    // Filter out null values (medical files not found)
    const validPatientDetails = patientDetails.filter(
      (details) => details !== null
    );

    // Calculate totalAmount and numberOfMedicalFiles
    const totalAmount = validPatientDetails.reduce(
      (total, details) => total + (details?.amount || 0),
      0
    );
    const numberOfMedicalFiles = validPatientDetails.length;

    res.json({
      slip: validPatientDetails,
      totalAmount,
      numberOfMedicalFiles,
      currentMedicalFilesSlip: user.currentMedicalFilesSlip,
      currentMedicalFilesSlipStartDate: user.currentMedicalFilesSlipStartDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const UserToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!UserToUpdate) {
      return res.status(404).send();
    }
    res.send(UserToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const resetUserCnamSlip = async (req, res) => {
  try {
    console.log("resetUserCnamSlip");
    const userId = req.params.id;

    // Fetch the user to get the currentMedicalFilesSlip
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update cnamStatus to "E" for all medical files in currentMedicalFilesSlip
    const medicalFileIds = userToUpdate.currentMedicalFilesSlip;
    await MedicalFile.updateMany(
      { _id: { $in: medicalFileIds } },
      { $set: { cnamStatus: "E" } }
    );

    // Reset currentMedicalFilesSlipStartDate to new Date().toISOString()
    userToUpdate.currentMedicalFilesSlipStartDate = new Date().toISOString();

    // Reset currentMedicalFilesSlip to an empty array
    userToUpdate.currentMedicalFilesSlip = [];

    // Use updateOne to update the user
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          currentMedicalFilesSlipStartDate:
            userToUpdate.currentMedicalFilesSlipStartDate,
          currentMedicalFilesSlip: userToUpdate.currentMedicalFilesSlip,
        },
      }
    );

    res.json({ message: "User CnamSlip reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).send();
    }
    if (!compareSync(req.body.currentPassword, userToUpdate.password)) {
      return res.status(400).send("Invalid current password");
    }

    userToUpdate.password = hashSync(req.body.newPassword, 10);
    await userToUpdate.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const UserToDelete = await User.findByIdAndDelete(req.params.id);
    if (!UserToDelete) {
      return res.status(404).send();
    }
    res.send(UserToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany({
      _id: { $in: req.body.UserIds },
    });
    res
      .status(200)
      .json({ message: "Users deleted successfully", deletedUsers });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Users", error });
  }
};

const addMedicalFileToUser = async (req, res) => {
  try {
    const { medicalFileId } = req.body;
    const userId = req.params.userId;

    // Check if the 'medicalFileId' field is present in the request body
    if (!medicalFileId) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'medicalFileId' is required." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the medical file and update its cnamStatus to "A"
    const updatedMedicalFile = await MedicalFile.findOneAndUpdate(
      { _id: medicalFileId },
      { $set: { cnamStatus: "A" } },
      { new: true }
    );

    // Check if the medical file was found and updated
    if (!updatedMedicalFile) {
      return res
        .status(404)
        .json({ error: "Medical file not found or could not be updated" });
    }

    // Use updateOne to add the medicalFileId to the user's currentMedicalFilesSlip array
    await User.updateOne(
      { _id: userId },
      { $addToSet: { currentMedicalFilesSlip: medicalFileId } }
    );

    res.json({
      message: "Medical file added to user's currentMedicalFilesSlip",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getAllSubusers,
  getUserById,
  updateUser,
  deleteUser,
  getUserCustomFieldsById,
  deleteUsers,
  updatePassword,
  addMedicalFileToUser,
  getUserCnamSlipById,
  resetUserCnamSlip,
};
