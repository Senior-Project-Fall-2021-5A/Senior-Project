const mongoose = require('mongoose');

const DoctorDemoSchema = new mongoose.Schema({

    demoUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserDemoModel',
        required: true, 
    },
    fieldOfStudy: {
        type: String,
        required: false,
    },
    doctorID: {
        type: String,
        required: true,
    },
});

const DoctorDemoModel = mongoose.model('DoctorDemo', DoctorDemoSchema)
module.exports = DoctorDemoModel