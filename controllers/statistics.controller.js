const Transaction = require("../models/transaction");
const Appointments = require("../models/appointment");
const {getLastXMonths} = require("../utils/getPreviousMonths");

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
  
    try {
      const numberOfMonths = req.body.barMonths; 
      const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - numberOfMonths + 1));
      const transactions = await Transaction.find({
        createdAt: { $gte: startDate },
      });
 
  
      const lastXMonths = getLastXMonths(numberOfMonths);
      const data = JSON.parse(lastXMonths);
  
      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        const transactionMonth = `${transactionDate.getFullYear()}-${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}`;
        if (data[transactionMonth]) {
          if (transaction.type === 'Income') {
            data[transactionMonth].income += parseInt(transaction.amount);
          } else {
            data[transactionMonth].outcome += parseInt(transaction.amount);
          }
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
