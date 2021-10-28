const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
    
    senderEmail: {
        type: String,
        required: false,
    },
    recieverEmail: {
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
        type: Date,
        required: false,
    },
    isRead: {
        type: Boolean,
        required: false,
    },
});

const InboxModel = mongoose.model('Inbox', InboxSchema)
module.exports = InboxModel