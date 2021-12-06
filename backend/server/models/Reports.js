const mongoose = require('mongoose');

const ReportsSchema = new mongoose.Schema({
    userUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    appointmentsUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
    },
    doctorUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    date: {
        type: String,
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