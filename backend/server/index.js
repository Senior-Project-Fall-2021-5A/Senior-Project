const express = require('express');
const mongoose = require('mongoose');
const app = express();
const LocationModel = require('./models/Location');

// MONGODB ATLAS CONNECTION
mongoose.connect('mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);


/// This is the route
app.get('/insert', async (req, res) => {   
    const Location = new LocationModel({name: "doctorLocation", address1: "aslkdjalkdjas", city: "Kennesaw", state: "GA", zip:"12345"})
    await Location.save()
    res.send('Data Insert Successful')
});


app.listen(3002, () => {
    console.log('Connection SUCCESSFUL')
});