const express = require('express');
const router = express.Router();
const cors = require('cors');
const LocationModel = require('../models/Location');
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getLocation/:locationId', function (req, res) {
    LocationModel.find({_id: req.params.locationId })
    .then(location => {
        if (!location) { return res.send("Invalid Location ID")}
        return res.status(200).json(location);
    })
    .catch(err => next(err));
});

router.get('/getLocations', async (req, res) => {
    LocationModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/addLocation', async (req, res) => {
    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    const newMessage = 
        new LocationModel({ 
            name: name,
            address1: address1,
            address2: address2, 
            city: city,
            state: state,
            zip: zip,
        });

await newMessage.save();
res.send("Location added!")
});

module.exports = router;