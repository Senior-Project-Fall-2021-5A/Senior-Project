const express = require('express')
const router = express.Router();
const cors = require('cors')
const InsuranceModel = require('../models/Insurance')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getInsurance', async (req, res) => {
    InsuranceModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getInsurance/:userId', async (req, res) => {
    InsuranceModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
    .then(insurance => {
        if (!insurance) { return res.send("No Insurance for User")}
        return res.status(200).json(insurance);
    })
    .catch(err => next(err));
});

router.post('/addInsurance', async (req, res) => {
    const usersOnPlan = req.body.usersOnPlan;
    const insuranceName = req.body.insuranceName;
    const accountNum = req.body.accountNum;
 
    
    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);


    const newInsurance = 
        new InsuranceModel({  
            usersOnPlan: usersOnPlan,
            insuranceName: insuranceName,
            accountNum: accountNum,

        });
    
    await newInsurance.save();
    res.send("Added insurance!")
});

module.exports = router;