const mongoose = require('mongoose');

const ScheduledSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    time: {
        type: [String],
        required: false,
    },
});

const ScheduledModel = mongoose.model('DoctorSchedule', ScheduledSchema)
module.exports = ScheduledModel
