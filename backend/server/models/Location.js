const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
});

const LocationModel = mongoose.model('Location', LocationSchema)
module.exports = LocationModel