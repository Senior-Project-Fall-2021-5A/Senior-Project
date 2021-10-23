const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({

    usersOnPlan: [{
        type: mongoose.Schema.Types.String, ref: 'UserDemoModel',
        required: true, 
    }],
    insuranceName: {
        type: String,
        required: true,
    },
    accountNum: {
        type: String,
        required: true,
    },
});

const InsuranceModel = mongoose.model('Insurance', InsuranceSchema)
module.exports = InsuranceModel