const express = require('express');
const router = new express.Router();
const { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient, deletePatients } = require('../controllers/patients.controler');


router.use(express.json())

router.post('/patients', createPatient);

router.get('/patients', getAllPatients);

router.get('/patients/:id', getPatientById);

router.patch('/patients/:id', updatePatient);

router.delete('/patients/:id', deletePatient);

router.delete('/patients', deletePatients);

module.exports = router;