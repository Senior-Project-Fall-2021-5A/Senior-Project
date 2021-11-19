const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const InboxModel = require('../models/Inbox')
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));
router.get('/getInbox/:userId', function (req, res) {
    InboxModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
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
    const senderEmail = req.body.sender;
    const recieverEmail = req.body.reciever;
    const subject = req.body.subject;
    const body = req.body.body;
    const date = req.body.date;
    const isRead = req.body.isRead;

    // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const doctorObjId = new ObjectID(doctorUID);
    const inboxObjId = new ObjectID(inboxUID);

    const newMessage = 
        new InboxModel({ 
            senderEmail: senderEmail,
            recieverEmail: recieverEmail, 
            subject: subject,
            body: body,
            date: date,
            isRead: isRead,
        });

await newMessage.save();
res.send("Sent Message!")
});


module.exports = router;