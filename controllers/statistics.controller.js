const Transaction = require("../models/transaction");
const Appointments = require("../models/appointment");
const Patients = require("../models/patient");
const { getLastXMonths } = require("../utils/getPreviousMonths");

const confirmed_perentage = async (req, res) => {
  let totalAppointment = 0;
  let totalAppointmentConfirmed = 0;
  try {
    const allMobileAppointment = await Appointments.find({ initialType: "P" });
    allMobileAppointment.forEach((appointment) => {
      totalAppointment++;
      if (appointment.type == "Q") {
        totalAppointmentConfirmed++;
      }
    });

    let result = (totalAppointmentConfirmed * 100) / totalAppointment;
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate percentage");
  }
};
const patientAges = async (req, res) => {
  try {
    const allpatients = await Patients.find();
    const result = {
      under18: [0, 0],
      under40: [0, 0],
      over40: [0, 0],
    };

    allpatients.forEach((patient) => {
      const birthDate = new Date(patient.birthday);
      const timeDiff = Date.now() - birthDate.getTime();
      const age = Math.floor(timeDiff / 3.154e10);

      if (age < 18) {
        result.under18[0]++;
        result.under18[1] += 100 / allpatients.length;
      } else if (age < 40) {
        result.under40[0]++;
        result.under40[1] += 100 / allpatients.length;
      } else {
        result.over40[0]++;
        result.over40[1] += 100 / allpatients.length;
      }
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate patient ages");
  }
};

const currentMonthlyGain = async (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  try {
    const currentMonthTransactions = await Transaction.find({
      date: { $regex: `${currentMonth}/\\d{1,2}/${currentYear}` },
    });

    let gain = 0;
    currentMonthTransactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        gain += transaction.amount;
      } else {
        gain -= transaction.amount;
      }
    });

    res.status(200).json({ gain });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate gain");
  }
};

const totalProfit = async (req, res) => {
  try {
    const currentMonthTransactions = await Transaction.find({});

    let gain = 0;
    currentMonthTransactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        gain += transaction.amount;
      } else {
        gain -= transaction.amount;
      }
    });

    res.status(200).json({ gain });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate total profit");
  }
};
const barChart = async (req, res) => {
  const currentDate = new Date();

  try {
    const numberOfMonths = req.body.barMonths;
    const startDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - numberOfMonths)
    );
    const transactions = await Transaction.find({
      createdAt: { $gte: startDate },
    });

    const lastXMonths = getLastXMonths(numberOfMonths);
    const data = JSON.parse(lastXMonths);

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const transactionMonth = `${transactionDate.getFullYear()}-${(
        transactionDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      if (data[transactionMonth]) {
        if (transaction.type === "Income") {
          data[transactionMonth].income += parseInt(transaction.amount);
        } else {
          data[transactionMonth].outcome += parseInt(transaction.amount);
        }
      }
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate");
  }
};

const currentMonthlyPatients = async (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  try {
    const currentMonthPatients = await Patients.count({
      // date: { $regex: `${currentMonth}/\\d{1,2}/${currentYear}` },
      // type: "Q",
    });

    res.status(200).json({ currentMonthPatients });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to calculate total patients");
  }
};

module.exports = {
  currentMonthlyGain,
  totalProfit,
  barChart,
  currentMonthlyPatients,
  patientAges,
  confirmed_perentage,
};
