const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const patientRouter = require("./routers/patient.router");
const appointmentRouter = require("./routers/appointment.router");
const loginRouter = require("./routers/login.router");
const mobileLoginRouter = require("./routers/mobileLogin.router");
const signupRouter = require("./routers/signup.router");
const accountRouter = require("./routers/user.router");
const statisticsRouter = require("./routers/statistics.router");
const transactionRouter = require("./routers/transaction.router");
const medicalFileRouter = require("./routers/medicalFile.router");
const medicalHistoryRouter = require("./routers/medicalHistory.router");
const mobileUserRouter = require("./routers/mobileUser.router");
const reportRouter = require("./routers/report.router");
const specificFields = require("./routers/specificFields.router");
const allergies = require("./routers/allergies.router");
const medicines = require("./routers/medicines.router");
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// Routers
app.use(signupRouter);
app.use(loginRouter);
app.use(patientRouter);
app.use(mobileUserRouter);
app.use(medicalFileRouter);
app.use(medicalHistoryRouter);
app.use(appointmentRouter);
app.use(transactionRouter);
app.use(reportRouter);
app.use(statisticsRouter);
app.use(accountRouter);
app.use(mobileLoginRouter);
app.use(specificFields);
app.use(allergies);
app.use(medicines);

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://htirakamel:WRFV8npNy3SQLsmI@medvizor.wmms7jg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Doc server working on port ${port}..`);
});
