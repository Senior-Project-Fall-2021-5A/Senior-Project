const mongoose = require('mongoose');

const UserDemoSchema = new mongoose.Schema({
    
    userUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
        required: true,
    },   
    firstName: {
        type: String,
        required: false,
    },   
    midName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    DoB: {
        type: Date,
        required: false,
    },
    gender: {
        type: Boolean,
        required: false,
    },
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: Number,
        required: false,
    },
    idNum: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone1: {
        type: Number,
        required: false,
    },
    phone2: {
        type: Number,
        required: false,
    },
    phone3: {
        type: Number,
        required: false,
    },
    Insurance01UID: {
        type: String,
        required: false,
    },
    Insurance02UID: {
        type: String,
        required: false,
    },
    Insurance03UID: {
        type: String,
        required: false,
    },
    documents = models.FileField(storage=documentStorage, blank=True)


});

const UserDemoModel = mongoose.model('UserDemographics', UserDemoSchema)
module.exports = UserDemoModel