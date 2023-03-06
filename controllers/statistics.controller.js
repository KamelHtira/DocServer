const Transaction = require("../models/transaction");
const Appointments = require("../models/appointment");

const currentMonthlyGain = async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    try {
        const currentMonthTransactions = await Transaction.find({ date: { $regex: `${currentMonth}/\\d{1,2}/${currentYear}` } });

  
      let gain = 0;
      currentMonthTransactions.forEach((transaction) => {
        if (transaction.type === 'Income') {
          gain += transaction.amount;
        } else {
          gain -= transaction.amount;
        }
      });
  
      res.status(200).json({ gain });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to calculate gain');
    }
  };


  const totalProfit = async (req,res) => {
    try {
      const currentMonthTransactions = await Transaction.find({});


    let gain = 0;
    currentMonthTransactions.forEach((transaction) => {
      if (transaction.type === 'Income') {
        gain += transaction.amount;
      } else {
        gain -= transaction.amount;
      }
    });

    res.status(200).json({ gain });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to calculate total profit');
  }
       

  }
  const barChart = async (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const data = {
      '1': { income: 0, outcome: 0 },
      '2': { income: 0, outcome: 0 },
      '3': { income: 0, outcome: 0 },
      '4': { income: 0, outcome: 0 },
      '5': { income: 0, outcome: 0 },
      '6': { income: 0, outcome: 0 },
      '7': { income: 0, outcome: 0 },
      '8': { income: 0, outcome: 0 },
      '9': { income: 0, outcome: 0 },
      '10': { income: 0, outcome: 0 },
      '11': { income: 0, outcome: 0 },
      '12': { income: 0, outcome: 0 },
    };
  
    try {
      const currentMonthTransactions = await Transaction.find({
        date: { $regex: `\\d{1,2}/\\d{1,2}/${currentYear}` },
      });
  
      currentMonthTransactions.forEach((transaction) => {
        const month = transaction.date.split('/')[0];
        if (transaction.type === 'Income') {
          data[month].income += transaction.amount;
        } else {
          data[month].outcome += transaction.amount;
        }
      });
  
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to calculate');
    }
  };

  const currentMonthlyPatients = async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    try {
        const currentMonthPatients = await Appointments.find({ date: { $regex: `${currentMonth}/\\d{1,2}/${currentYear}` } });

  
      let total = 0;
      currentMonthPatients.forEach((patient) => {
        total++ ;
      });
  
      res.status(200).json({ total });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to calculate total patients');
    }
  };



  

module.exports = {
    currentMonthlyGain,
    totalProfit,
    barChart,
    currentMonthlyPatients
};
