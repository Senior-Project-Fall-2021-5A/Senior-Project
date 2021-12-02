const express = require('express')
const router = express.Router();
const cors = require('cors')
const ScheduledModel = require('../models/Scheduled')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getScheduled', async (req, res) => {
    ScheduledModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getScheduled/:doctorId', async (req, res) => {
    ScheduledModel.find({ doctorUID: req.params.doctorId })
        .then(scheduled => {
            if (scheduled.length === 0) { return res.send("No scheduled for User")}
            return res.status(200).json(scheduled);
        })
        .catch(err => next(err));
});

router.post('/addScheduled/:doctorId', async (req, res) => {
    const doctorUID = req.params.doctorId;
    const date = req.body.date;
    const time = req.body.time;
    
    // Turn string input into ObjectIDs
    const doctorObjId = new ObjectID(doctorUID);
   
    const newScheduled = 
        new ScheduledModel({  
            doctorUID: doctorObjId,
            date: date,
            time: time,

        });
    
    await newScheduled.save();
    res.send("Added Scheduled!")
});

module.exports = router;