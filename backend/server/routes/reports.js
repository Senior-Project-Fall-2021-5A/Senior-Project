const express = require('express')
const router = express.Router();

const auth = require('../middleware/auth');
const ReportsModel = require('../models/Reports')

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
    const doctor = req.body.doc;
    const date = req.body.date;
    const report = req.body.report;

    const newReport = 
        new ReportsModel({ 
            doctorName: doctor, 
            date: date,
            report: report,
            file: req.body.file,
        });
    
    await newReport.save();
    res.send("Added report!")
});

module.exports = router;