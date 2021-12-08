const express = require('express')
const router = express.Router();
const cors = require('cors')
const NotificationsModel = require('../models/Notifications')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getNotifications', async (req, res) => {
    NotificationsModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getNotifications/:userId', async (req, res) => {
    NotificationsModel.find({
        $or: [
            { userUID: req.params.userId }
        ]
    })
    .then(notification => {
        if (!notification) { return res.send("No Notifications for User")}
        return res.status(200).json(notification);
    })
    .catch(err => next(err));
});

router.post('/updateNotification/:notifId', async (req, res) => {
    const updateFields = req.body;
    const notifId = req.params.notifId;
    NotificationsModel.findOneAndUpdate({_id: notifId}, 
        updateFields, {new: true},
        (err, result) => {
            if (err) {
            res.send("Unable to update info for", {notifId})
            } else {
            res.status(200).json(result);
            }
        })
});

router.post('/addNotifications', async (req, res) => {
    const userUID = req.body.userUID;
    const appointmentsUID = req.body.appointmentsUID;
    const reportsUID = req.body.reportsUID;
    const inboxUID = req.body.inboxUID;
    const message = req.body.message;
    const notif_type = req.body.notif_type;
    const date_time = req.body.date_time;
    const isRead = req.body.isRead;
    
    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const appointmentsObjId = new ObjectID(appointmentsUID);
    const reportsObjId = new ObjectID(reportsUID);
    const inboxObjId = new ObjectID(inboxUID);

    const newNotifications = 
        new NotificationsModel({  
            userUID: userObjId,
            appointmentsUID: appointmentsObjId,
            reportsUID: reportsObjId,
            inboxUID: inboxObjId,
            message: message,
            notif_type: notif_type,
            data_time: date_time,
            isRead: isRead,

        });
    
    await newNotifications.save();
    res.send("Added Notifications!")
});

module.exports = router;