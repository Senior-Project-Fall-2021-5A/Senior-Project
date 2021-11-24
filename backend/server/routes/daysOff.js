const express = require('express')
const router = express.Router();
const cors = require('cors')
const DaysOffModel = require('../models/DaysOff')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getDaysOff', async (req, res) => {
    AppointmentModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getDaysOff/:userId', async (req, res) => {
    DaysOffModel.find({
        $or: [
            { doctorUID: req.params.userId }
        ]
    })
    .then(dayOff => {
        if (!dayOff) { return res.send("No Days Off for User")}
        return res.status(200).json(dayOff);
    })
    .catch(err => next(err));
});

router.post('/addDaysOff', async (req, res) => {
    const doctorUID = req.body.doctorUID;
    const daysOff = req.body.dayOff;
    
    // Turn string input into ObjectIDs
    const doctorObjId = new ObjectID(doctorUID);

    const newDaysOff = 
        new DaysOffModel({  
            doctorUID: doctorObjId,
            daysOff: daysOff,

        });
    
    await newDaysOff.save();
    res.send("Added Days Off!")
});

module.exports = router;