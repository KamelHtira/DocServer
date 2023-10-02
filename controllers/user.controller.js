const User = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");

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
};
