const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    startDate: String,
    endDate: String,
    reportType: String,
    fileType: String,
    size: String,
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
