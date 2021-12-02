const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
    
    senderID: {
        type: String,
        required: false,
    },
    recieverID: {
        type: String,
        required: false,
    },
    subject: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    isRead: {
        type: Boolean,
        required: false,
    },
});

const InboxModel = mongoose.model('Inbox', InboxSchema)
module.exports = InboxModel