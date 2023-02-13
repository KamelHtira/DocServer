const csv = require('csv-express');
const exportPatients = async (req, res) => {
  try {
    const data = req.body;
  res.csv(data, {
    filename: 'data.csv'
  });
  console.log(data);
  } catch (error) {
    res.send("can not download file " + error);
  }
};

module.exports = {
    exportPatients,
  };
  
