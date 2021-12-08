const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({

    userUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    appointmentsUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
    },
    reportsUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    inboxUID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    notif_type: {
        type: String,
        required: false,
    },
    date_time: {
        type: String,
        required: false,
    },
    isRead: {
        type: Boolean,
        required: false,
    },
});

const NotificationsModel = mongoose.model('Notifications', NotificationsSchema)
module.exports = NotificationsModel