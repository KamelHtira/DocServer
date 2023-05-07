const MobileUser = require("../models/mobileUser");
const { hashSync, compareSync } = require("bcrypt");

const createMobileUser = async (req, res) => {
  const mobileUser = new MobileUser({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    birthday: req.body.birthday,
    sexe: req.body.sexe,
    address: req.body.address,
    settings: req.body.settings,
  });
  mobileUser
    .save()
    .then((mobileUser) => {
      res.send({
        success: true,
        message: "MobileUser created successfully.",
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

const getAllMobileUsers = async (req, res) => {
  try {
    const MobileUsers = await MobileUser.find({});
    res.send(MobileUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMobileUserById = async (req, res) => {
  try {
    const MobileUserToShow = await MobileUser.findById(req.params.id);
    if (!MobileUserToShow) {
      return res.status(404).send();
    }
    res.send(MobileUserToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMobileUserCustomFieldsById = async (req, res) => {
  try {
    const customFields = await MobileUser.findById(
      req.params.id,
      "customFields"
    );
    if (!customFields) {
      return res.status(404).send();
    }
    res.send(customFields);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMobileUser = async (req, res) => {
  try {
    const MobileUserToUpdate = await MobileUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!MobileUserToUpdate) {
      return res.status(404).send();
    }
    res.send(MobileUserToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};
const updatePassword = async (req, res) => {
  try {
    const mobileUserToUpdate = await MobileUser.findById(req.params.id);
    if (!mobileUserToUpdate) {
      return res.status(404).send();
    }
    if (!compareSync(req.body.currentPassword, mobileUserToUpdate.password)) {
      return res.status(400).send("Invalid current password");
    }

    mobileUserToUpdate.password = hashSync(req.body.newPassword, 10);
    await mobileUserToUpdate.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteMobileUser = async (req, res) => {
  try {
    const MobileUserToDelete = await MobileUser.findByIdAndDelete(
      req.params.id
    );
    if (!MobileUserToDelete) {
      return res.status(404).send();
    }
    res.send(MobileUserToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteMobileUsers = async (req, res) => {
  try {
    const deletedMobileUsers = await MobileUser.deleteMany({
      _id: { $in: req.body.MobileUserIds },
    });
    res.status(200).json({
      message: "MobileUsers deleted successfully",
      deletedMobileUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete MobileUsers", error });
  }
};

module.exports = {
  createMobileUser,
  getAllMobileUsers,
  getMobileUserById,
  updateMobileUser,
  deleteMobileUser,
  getMobileUserCustomFieldsById,
  deleteMobileUsers,
  updatePassword,
};
