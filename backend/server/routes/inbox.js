const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const InboxModel = require('../models/Inbox')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));
router.get('/getMessages/:userId', function (req, res) {
    InboxModel.find({
        $or: [
            { senderID: req.params.userId },
            { recieverID: req.params.userId }
        ]
    }).sort({ $natural: -1 })
    .then(inbox => {
        if (!inbox) { return res.send("No Message for User")}
        return res.status(200).json(inbox);
    })
    .catch(err => next(err));
});

router.get('/getInbox', async (req, res) => {
    InboxModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/sendMessage', async (req, res) => {
    const senderID = req.body.senderID;
    const recieverID = req.body.recieverID;
    const subject = req.body.subject;
    const body = req.body.body;
    const date = req.body.date;
    const isRead = req.body.isRead;

    const newMessage = 
        new InboxModel({ 
            senderID: senderID,
            recieverID: recieverID, 
            subject: subject,
            body: body,
            date: date,
            isRead: isRead,
        });

    await newMessage.save();
    res.send("Sent Message!")
});


module.exports = router;