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

router.get('/getScheduled/:userId', async (req, res) => {
    ScheduledModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
    .then(scheduled => {
        if (!scheduled) { return res.send("No scheduled for User")}
        return res.status(200).json(scheduled);
    })
    .catch(err => next(err));
});

router.post('/addScheduled', async (req, res) => {
    const doctorUID = req.body.doctorUID;
    const booked = req.body.booked;
    const date_time = req.body.date_time;
    
    // Turn string input into ObjectIDs
    const doctorObjId = new ObjectID(doctorUID);
   
    const newScheduled = 
        new ScheduledModel({  
            doctorUID: doctorObjId,
            booked: booked,
            date_time: date_time,

        });
    
    await newScheduled.save();
    res.send("Added Scheduled!")
});

module.exports = router;