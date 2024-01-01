const Report = require("../models/report");

const createReport = async (req, res) => {
  const newReport = new Report(req.body);
  try {
    await newReport.save();
    res.status(201).send(newReport);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createCnamReport = async (req, res) => {
  const newReport = new Report(req.body);
  try {
    await newReport.save();
    res.status(201).send(newReport);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.send(reports);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getReportById = async (req, res) => {
  try {
    const ReportToShow = await Report.findById(req.params.id);
    if (!ReportToShow) {
      return res.status(404).send();
    }
    res.send(ReportToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getReportByPatientId = async (req, res) => {
  try {
    const ReportToShow = await Report.find({
      patientId: req.params.id,
    });
    if (!ReportToShow) {
      return res.status(404).send();
    }
    res.send(ReportToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateReport = async (req, res) => {
  try {
    const reportToUpdate = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reportToUpdate) {
      return res.status(404).send();
    }
    res.send(reportToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportToDelete = await Report.findByIdAndDelete(req.params.id);
    if (!reportToDelete) {
      return res.status(404).send();
    }
    res.send(reportToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteReports = async (req, res) => {
  try {
    const deletedReports = await Report.deleteMany({
      _id: { $in: req.body.reportIds },
    });
    res.status(200).json({
      message: "Reports deleted successfully",
      deletedReports,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reports", error });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  deleteReports,
  getReportByPatientId,
  createCnamReport,
};
