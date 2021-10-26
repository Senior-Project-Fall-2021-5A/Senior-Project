const mongoose = require('mongoose');

const DaysOffSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'DoctorDemoModel',
        required: true,
    },
    dayOff: {
        type: Date,
        required: false,
    },
});

const DaysOffModel = mongoose.model('DocDaysOff', DaysOffSchema)
module.exports = DaysOffModel