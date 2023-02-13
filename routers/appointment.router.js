const express = require('express');
const router = new express.Router();
const { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment, deleteAppointments } = require('../controllers/appointment.controller');

router.use(express.json())

router.post('/appointments', createAppointment);

router.get('/appointments', getAllAppointments);

router.get('/appointments/:id', getAppointmentById);

router.patch('/appointments/:id', updateAppointment);

router.delete('/appointments/:id', deleteAppointment);

router.delete('/appointments', deleteAppointments);

module.exports = router;