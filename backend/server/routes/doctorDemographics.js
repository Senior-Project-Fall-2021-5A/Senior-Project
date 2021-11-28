const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const DoctorDemoModel = require('../models/DoctorDemographics')
var ObjectID = require('mongodb').ObjectId;

router.get('/getDoctorInfo/:userId', async (req, res) => {
    DoctorDemoModel.find({userUID: req.params.userId}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/addDoctorInfo', async (req, res) => {
    const doctorUID = req.body.doctorUID;
    const fieldOfStudy = req.body.fieldOfStudy;

    const doctorObjId = new ObjectID(doctorUID);

    const newDoctorInfo = 
        new DoctorDemoModel({
            doctorUID: doctorObjId,
            fieldOfStudy: fieldOfStudy
        });
    
    await newDoctorInfo.save();
    res.send("Doctor info added");
});

module.exports = router;