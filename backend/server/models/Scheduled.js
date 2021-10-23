const mongoose = require('mongoose');

const ScheduledSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'DoctorDemoModel',
        required: true,
    },
    booked: {
        type: Boolean,
        required: false,
    },
    date_time: {
        type: Date,
        required: false,
    },
});

const ScheduledModel = mongoose.model('DoctorSchedule', ScheduledSchema)
module.exports = ScheduledModel
