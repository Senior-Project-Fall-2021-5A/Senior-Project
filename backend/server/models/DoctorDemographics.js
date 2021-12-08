const mongoose = require('mongoose');

const DoctorDemoSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
    },
    locationUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    fieldOfStudy: {
        type: String,
        required: false,
    },
});

const DoctorDemoModel = mongoose.model('DoctorDemo', DoctorDemoSchema)
module.exports = DoctorDemoModel