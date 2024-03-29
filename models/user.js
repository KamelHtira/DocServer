const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  cnamCode: String, //tn
  cnamCenterRef: String, //tn
  VAT: Number, //tn
  MTM: Number, //tn montant tiket moderatuer
  consultationPrice: Number, //tn
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  birthday: String,
  address: String,
  state: String,
  type: String,
  currentMedicalFilesSlip: [String],
  currentMedicalFilesSlipStartDate: {
    type: String,
    default: new Date().toISOString(),
  },
  customFields: { type: [{}] },
  settings: { type: {} },
  access: {
    type: {},
    default: {
      dashboard: false,
      patient: false,
      transaction: false,
      setting: true,
      appointment: false,
    },
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
