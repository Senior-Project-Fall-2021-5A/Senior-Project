const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const ReportsModel = require('../models/Reports')

router.use(cors({origin: '*'}));

router.get('/getReports', async (req, res) => {
    ReportsModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.post('/addReport', async (req, res) => {
    const doctor = req.body.doctor;
    const date = req.body.date;
    const details = req.body.details;

    const newReport = 
        new ReportsModel({ 
            doctor: doctor, 
            date: date,
            details: report,
        });
    
    await newReport.save();
    res.send("Added report!")
});

module.exports = router;