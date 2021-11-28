const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    reportsUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    locationUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    apptNotes: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    virtualID: {
        type: String,
        required: false,
    },
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema)
module.exports = AppointmentModel