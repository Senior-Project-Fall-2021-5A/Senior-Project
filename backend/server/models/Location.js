const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: false,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
});

const LocationModel = mongoose.model('Location', LocationSchema)
module.exports = LocationModel