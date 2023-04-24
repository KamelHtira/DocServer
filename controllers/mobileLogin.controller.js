const MobileUser = require("../models/mobileUser");
const { compareSync } = require("bcrypt");

const mobileLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mobileUser = await MobileUser.findOne({ email });

    if (!mobileUser) {
      return res.status(400).json({ msg: "MobileUser not found" });
    }

    if (!compareSync(password, mobileUser.password)) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    res.json({ msg: "Login successful", mobileUser: mobileUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  mobileLogin,
};
