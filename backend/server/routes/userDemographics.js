const express = require('express')
const router = express.Router();
const cors = require('cors')
const UserDemoModel = require('../models/UserDemographics')
var ObjectID = require('mongodb').ObjectId;

router.post('/createUserProfile/:userId', async (req, res) => {
    const userUID = req.body.userUID;
    const firstName = req.body.firstname;
    const midName = req.body.midName;
    const lastName = req.body.lastName;
    const DoB = req.body.DoB;
    const gender = req.body.gender;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const email = req.body.email;
    const phone1 = req.body.phone1;
    const phone2 = req.body.phone2;
    const phone3 = req.body.phone3;
    const Insurance01UID = req.body.Insurance01UID;
    const Insurance02UID = req.body.Insurance02UID;
    const Insurance03UID = req.body.Insurance03UID;
    const primaryPhysician = req.body.primaryPhysician;
    const approvedDoctors = req.body.approvedDoctors;

    const userObjId = new ObjectID(userUID);

    const newUserProfile = 
        new UserDemoModel({
            userUID: userObjId,
            firstName: firstName,
            midName: midName,
            lastName: lastName,
            DoB: DoB,
            gender: gender,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
            email: email,
            phone1: phone1,
            phone2: phone2,
            phone3: phone3,
            Insurance01UID: Insurance01UID,
            Insurance02UID: Insurance02UID,
            Insurance03UID: Insurance03UID,
            primaryPhysician: primaryPhysician,
            approvedDoctors: approvedDoctors,
        });
    
    await newUserProfile.save();
    res.send("Added user info!")
})

router.get('/getUserInfo/:userId', async (req, res) => {
    UserDemoModel.find({ 
        userUID: req.params.userId
    })
    .then(userInfo => {
        if (!userInfo) {return res.send("No Info for User")}
        return res.status(200).json(userInfo);
    })
    .catch(err => next(err));
});

router.post('/updateUserInfo/:userId', async (req, res) => {
    UserDemoModel.findOneAndUpdate({userUID: req.params.userId},
        {
            $set: {
                firstName: req.body.firstName,
                midName: req.body.midName,
                lastName: req.body.lastName,
                DoB: req.body.DoB,
                gender: req.body.gender,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                email: req.body.email,
                phone1: req.body.phone1,
                phone2: req.body.phone2,
                phone3: req.body.phone3,
                Insurance01UID: req.body.Insurance01UID,
                Insurance02UID: req.body.Insurance02UID,
                Insurance03UID: req.body.Insurance03UID,
                primaryPhysician: req.body.primaryPhysician,
                approvedDoctors: req.body.approvedDoctors,
            }
        },
        (err, result) => {
            if (err) {
                res.send("Unable to update info for", {userId})
            } else {
                res.status(200).json(result);
                res.send("User info updated1")
            }
        })
})