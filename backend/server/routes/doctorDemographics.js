const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const DoctorDemoModel = require('../models/DoctorDemographics')
var ObjectID = require('mongodb').ObjectId;

router.get('/getDoctorInfo/:userId', async (req, res) => {
    DoctorDemoModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send
        }
    });
});