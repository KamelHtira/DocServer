const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    startDate: String,
    endDate: String,
    reportType: String, // P patients, T transactions, CNAM cnam
    fileType: String,
    size: String,
    listRecordsIds: [String],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
