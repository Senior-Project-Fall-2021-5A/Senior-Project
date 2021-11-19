const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const ReportsModel = require('../models/Reports')
var ObjectID = require('mongodb').ObjectId;

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

router.get('/getReports/:userId', function (req, res) {
    ReportsModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
    .then(report => {
        if (!report) { return res.send("No Report for User")}
        return res.status(200).json(report);
    })
    .catch(err => next(err));
});

router.post('/addReport', async (req, res) => {
    const doctor = req.body.doctor;
    const date = req.body.date;
    const details = req.body.details;
    const attachments = req.body.attachments;

    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const doctorObjId = new ObjectID(doctorUID);
    const reportObjId = new ObjectID(reportUID);

    const newReport = 
        new ReportsModel({ 
            doctor: doctor, 
            date: date,
            details: details,
            attachments: attachments,
        });
    
    await newReport.save();
    res.send("Added report!")
});

module.exports = router;