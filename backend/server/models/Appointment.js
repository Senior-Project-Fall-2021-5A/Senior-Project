const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    
    userUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    doctorUID: {
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
        required: true,
    },
    apptNotes: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    isCurrent: {
        type: Boolean,
        required: true,
    },
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema)
module.exports = AppointmentModel