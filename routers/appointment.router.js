const express = require("express");
const router = new express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  deleteAppointments,
  getConfirmedAppointments,
} = require("../controllers/appointment.controller");


router.post("/appointments", createAppointment);

router.get("/appointments", getAllAppointments);

router.get("/appointments/:id", getAppointmentById);

router.delete("/appointments/confirmed", getConfirmedAppointments);

router.patch("/appointments/:id", updateAppointment);

router.delete("/appointments/:id", deleteAppointment);

router.delete("/appointments", deleteAppointments);

module.exports = router;
