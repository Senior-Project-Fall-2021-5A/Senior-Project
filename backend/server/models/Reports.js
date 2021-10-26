const mongoose = require('mongoose');

const ReportsSchema = new mongoose.Schema({
    appointmentsUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentsModel',
        required: true, 
    },
    date_time: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    attachments: {
        file: {
            type: Buffer,
        },
        contentType: String,
    },
});

const ReportsModel = mongoose.model('Reports', ReportsSchema)
module.exports = ReportsModel