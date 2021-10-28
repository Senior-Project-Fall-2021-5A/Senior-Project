const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    
    userUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
        required: false,
    },
    doctorName: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    locationUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel',
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
    meetingLink: {
        type: String,
        required: false,
    },
    isCurrent: {
        type: Boolean,
        required: false,
    },
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema)
module.exports = AppointmentModel