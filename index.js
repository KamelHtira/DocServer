const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const patientRouter = require("./routers/patient.router");
const appointmentRouter = require("./routers/appointment.router");
const loginRouter = require("./routers/login.router");
const mobileLoginRouter = require("./routers/mobileLogin.router");
const signupRouter = require("./routers/signup.router");
const accountRouter = require("./routers/user.router");
const statisticsRouter = require("./routers/statistics.router");
const transactionRouter = require("./routers/transaction.router");
const medicalFileRouter = require("./routers/medicalFile.router");
const mobileUserRouter = require("./routers/mobileUser.router");
require("dotenv").config();

app = express();
app.use(cors());
app.use(express.json());

// Routers :

app.use(patientRouter);
app.use(mobileUserRouter);
app.use(medicalFileRouter);
app.use(accountRouter);
app.use(appointmentRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(mobileLoginRouter);
app.use(transactionRouter);
app.use(statisticsRouter);

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://hedi:1234@cluster0.qfe1yrj.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB using Mongoose");
});

app.get("/", (req, res) => {
  res.json({ response: "Doc Server is Working.." });
});

app.listen(3001, () => {
  console.log("Doc server working on port 3001..");
});
