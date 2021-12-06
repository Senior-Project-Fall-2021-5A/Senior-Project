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
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    time: {
        type: String,
        required: false,
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
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema)
module.exports = AppointmentModel