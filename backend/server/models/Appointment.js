const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    
    userUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
        required: true,
    },
    doctorUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'DoctorDemoModel',
        required: true,
    },
    date_time: {
        type: Date,
        required: false,
    },
    locationUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel',
        required: true,
    },
    apptNotes: {
        type: String,
        required: false,
    },
    isVirtual: {
        type: Boolean,
        required: true,
    },
    meetingLink: {
        type: String,
        required: false,
    },
    isCurrent: {
        type: Boolean,
        required: true,
    },
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema)
module.exports = AppointmentModel