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
    fileName: {
        type: String,
        required: false
    },
});

const ReportsModel = mongoose.model('Reports', ReportsSchema)
module.exports = ReportsModel