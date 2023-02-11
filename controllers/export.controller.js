const exportPatients = async (req, res) => {
  try {
    const { fileName } = req.query;
    const file = `./resources/csv/${fileName}`;
    res.download(file);
  } catch (error) {
    res.send("can not download file " + error);
  }
};

module.exports = {
    exportPatients,
  };
  
