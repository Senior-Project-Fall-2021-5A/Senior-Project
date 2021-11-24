const mongoose = require('mongoose');

const ReportsSchema = new mongoose.Schema({
    userUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
        required: true,
    },
    appointmentsUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentsModel',
        required: true, 
    },
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