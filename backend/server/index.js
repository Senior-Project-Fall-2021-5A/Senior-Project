const express = require('express');
const mongoose = require('mongoose');
const LocationModel = require('./models/Location');
const app = express()

var authRoutes = require('./routes/auth')

// MONGODB ATLAS CONNECTION
mongoose.connect('mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority', 
{ useNewUrlParser: true });

app.use('/auth', authRoutes)

/// This is the test route to insert location data 
app.get('/insert', async (req, res) => {   
    const Location = new LocationModel({name: "doctorLocation", address1: "1234 Doctor Address Lane", city: "Kennesaw", state: "GA", zip:"12345"})
    await Location.save()
    res.send('Data Insert Successful')
});

app.get('/read', async (req, res) => {
    LocationModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(process.env.PORT || 3002, () => {
    console.log('Connection SUCCESSFUL')
});

module.exports = app;