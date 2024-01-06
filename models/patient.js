const mongoose = require("mongoose");
const Counter = require("./counter");

const patientSchema = mongoose.Schema(
  {
    patientNumber: Number,
    cnamId: String,
    assuranceType: String,
    firstName: String,
    lastName: String,
    email: String,
    birthday: String,
    birthdayType: String,
    sexe: String,
    address: String,
    phone: String,
    civilState: String,
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  const doc = this;
  const counter = await Counter.findOneAndUpdate(
    { name: "patientNumber" },
    { $inc: { value: 1 } },
    { upsert: true, new: true }
  );
  doc.patientNumber = counter.value;
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
