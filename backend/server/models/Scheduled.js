const mongoose = require('mongoose');

const ScheduledSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    time: {
        type: [String],
        required: false,
    },
});

const ScheduledModel = mongoose.model('DoctorSchedule', ScheduledSchema)
module.exports = ScheduledModel
