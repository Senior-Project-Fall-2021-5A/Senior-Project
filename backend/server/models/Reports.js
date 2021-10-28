const mongoose = require('mongoose');

const ReportsSchema = new mongoose.Schema({

    doctor: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
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