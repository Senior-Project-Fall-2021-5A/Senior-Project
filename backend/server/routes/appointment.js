const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const AppointmentModel = require('../models/Appointment')

router.use(cors({origin: '*'}));

router.get('/getAppointments/', async (req, res) => {
    AppointmentModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.post('/addAppointments', async (req, res) => {
    const doctor = req.body.doc;
    const type = req.body.type;
    const date = req.body.date;
    const time = req.body.time;

    const newAppointment = 
        new AppointmentModel({ 
            doctorName: doctor, 
            type: type,
            date: date,
            time: time,
        });
    
    await newAppointment.save();
    res.send("Added appointment!")
});

module.exports = router;