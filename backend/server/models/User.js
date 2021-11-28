const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
        required: false,
    },
});
    

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel