const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        default: 0,
        required: false,
    },
});
    

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel