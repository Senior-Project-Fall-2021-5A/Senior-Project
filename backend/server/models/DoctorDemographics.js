const mongoose = require('mongoose');

const DoctorDemoSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },
    fieldOfStudy: {
        type: String,
        required: false,
    },
});

const DoctorDemoModel = mongoose.model('DoctorDemo', DoctorDemoSchema)
module.exports = DoctorDemoModel