const mongoose = require('mongoose');

const DaysOffSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    daysOff: {
        type: String,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
});

const DaysOffModel = mongoose.model('DocDaysOff', DaysOffSchema)
module.exports = DaysOffModel