const mongoose = require('mongoose');

const DaysOffSchema = new mongoose.Schema({

    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    daysOff: {
        type: Date,
        required: false,
    },
});

const DaysOffModel = mongoose.model('DocDaysOff', DaysOffSchema)
module.exports = DaysOffModel