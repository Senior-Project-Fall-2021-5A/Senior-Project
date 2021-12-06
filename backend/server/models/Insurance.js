const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({

    usersOnPlan: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
    }],
    insuranceName: {
        type: String,
        required: false,
    },
    accountNum: {
        type: String,
        required: false,
    },
});

const InsuranceModel = mongoose.model('Insurance', InsuranceSchema)
module.exports = InsuranceModel