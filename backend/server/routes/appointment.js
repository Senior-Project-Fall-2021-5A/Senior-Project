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
    .then(appointments => {
        if (appointments.length === 0) { return res.send("No appointments for User")}
        return res.status(200).json(appointments);
    })
    .catch(err => next(err));
});

router.get('/getAppointmentsByDate/:userId/:date', async (req, res) => {
    AppointmentModel.find({
        $and: [
            { date: req.params.date },
            { $or: [{ userUID: req.params.userId }, { doctorUID: req.params.userId }]}
        ]
    })
    .then(appointments => {
        if (appointments.length === 0) { return res.send("No appointments for user on selected Date")}
        return res.status(200).json(appointments);
    })
    .catch(err => next(err));
});

router.post('/addAppointment', async (req, res) => {
    const userUID = req.body.userUID;
    const doctorUID = req.body.doctorUID;
    const reportsUID = req.body.reportsUID;
    const date = req.body.date;
    const time = req.body.time;
    const locationUID = req.body.locationUID;
    const apptNotes = req.body.apptNotes;
    const type = req.body.type;
    const virtualID = req.body.virtualID;
    
    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const doctorObjId = new ObjectID(doctorUID);
    const reportsObjId = new ObjectID(reportsUID);
    const locationObjId = new ObjectID(locationUID);

    const newAppointment = 
        new AppointmentModel({  
            userUID: userObjId,
            doctorUID: doctorObjId,
            reportsUID: reportsObjId,
            date: date,
            time: time,
            locationUID: locationObjId,
            apptNotes: apptNotes,
            type: type,
            virtualID: virtualID,

        });
    
    await newAppointment.save();
    res.send("Added appointment!")
});

router.post('/updateApptInfo/:apptId', async (req, res) => {
    const updateFields = req.body;
    AppointmentModel.findOneAndUpdate({_id: req.params.apptId}, 
        updateFields, {new: true},
        (err, result) => {
            if (err) {
            res.send("Unable to update info for", {apptId})
            } else {
            res.status(200).json(result);
            }
        })
});

router.post('/cancelAppt/:apptId', async (req, res) => {
    AppointmentModel.findByIdAndRemove(req.params.apptId, function (err, response) {
        if (err){
            console.log(err)
        }
        else{
            console.log("RemovedAppt");
        }
    })
});

router.get('/getVirtualID/:apptId', async (req, res) => {
    AppointmentModel.find({_id: req.params.apptId}, ['virtualID'])
    .then(virtualID => {
        if (!virtualID) { return res.send("No VirtualId for the appointment")}
        return res.status(200).json(virtualID);
    })
    .catch(err => next(err));
});
module.exports = router;