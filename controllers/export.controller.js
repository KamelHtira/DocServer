const csv = require('csv-express');
const json2csv = require('json2csv').parse;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

const sendData = async (req, res) => {
  try {
    const data = req.body;

    // Create a unique filename for the CSV file
    const filename = `data-${uuidv4()}.csv`;

    // Convert the JSON data to CSV format
    const csvData = json2csv(data);

    // Write the CSV data to a file on the server
    const filePath = path.join(__dirname, '..','resources','csv', filename);
    await writeFile(filePath, csvData);

    // Send the download link to the client
    const downloadLink = `${req.protocol}://${req.get('host')}/download/${filename}`;
    res.send(downloadLink);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

const downloadData = async (req, res) => {
  const filename = req.params.filename;

  try {
    // Check if the requested file exists
    const filePath = path.join(__dirname, '..', 'resources','csv', filename);
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      res.status(404).send('File not found');
      return;
    }

    // Send the file as a download
    res.download(filePath, async (err) => {
      if (err) {
        res.status(500).send(`Error: ${err}`);
        return;
      }

      // Delete the file from the server after it's been downloaded
      try {
        await unlink(filePath);
      } catch (err) {
        console.error(`Failed to delete file: ${err}`);
      }
    });
  } catch (err) {
    res.status(404).send('File not found');
  }
};

module.exports = {
  sendData,
  downloadData
};
  
