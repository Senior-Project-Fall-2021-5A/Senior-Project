const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({

    userUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
        required: true,
    },
    appointmentsUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentsModel',
        required: true, 
    },
    reportsUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ReportsModel',
        required: true,
    },
    inboxUID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'InboxModel',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    notif_type: {
        type: String,
        required: true,
    },
    date_time: {
        type: Date,
        required: true,
    },
    isRead: {
        type: Boolean,
        required: true,
    },
});

const NotificationsModel = mongoose.model('Notifications', NotificationsSchema)
module.exports = NotificationsModel