const Appointment = require("../models/appointment");

const createAppointment = async (req, res) => {

  if (req.body.type == "Q") {
    req.body.queuedDate = new Date()
  }
  const newAppointment = new Appointment(req.body);
  try {
    await newAppointment.save();
    res.status(201).send(newAppointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};


const getConfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ type: "C" });
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const AppointmentToShow = await Appointment.findById(req.params.id);
    if (!AppointmentToShow) {
      return res.status(404).send();
    }
    res.send(AppointmentToShow);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointmentToUpdate = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointmentToUpdate) {
      return res.status(404).send();
    }
    res.send(appointmentToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointmentToDelete = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!appointmentToDelete) {
      return res.status(404).send();
    }
    res.send(appointmentToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteAppointments = async (req, res) => {
  try {
    const deletedAppointments = await Appointment.deleteMany({
      _id: { $in: req.body.appointmentIds },
    });
    res.status(200).json({
      message: "Appointments deleted successfully",
      deletedAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointments", error });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  deleteAppointments,
  getConfirmedAppointments
};
