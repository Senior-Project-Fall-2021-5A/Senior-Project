const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const AppointmentModel = require('../models/Appointment')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getAppointments', async (req, res) => {
    AppointmentModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getAppointments/:userId', async (req, res) => {
    AppointmentModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
    .then(appointment => {
        if (!appointment) { return res.send("No appointments for User")}
        return res.status(200).json(appointment);
    })
    .catch(err => next(err));
});

router.post('/addAppointment', async (req, res) => {
    const userUID = req.body.userUID;
    const doctorUID = req.body.doctorUID;
    const date = req.body.date;
    const time = req.body.time;
    const locationUID = req.body.locationUID;
    const apptNotes = req.body.apptNotes;
    const type = req.body.type;
    
    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const doctorObjId = new ObjectID(doctorUID);
    const locationObjId = new ObjectID(locationUID);

    const newAppointment = 
        new AppointmentModel({  
            userUID: userObjId,
            doctorUID: doctorObjId,
            date: date,
            time: time,
            locationUID: locationObjId,
            apptNotes: apptNotes,
            type: type,

        });
    
    await newAppointment.save();
    res.send("Added appointment!")
});

module.exports = router;