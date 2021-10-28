const express = require('express')
const router = express.Router();

const auth = require('../middleware/auth');
const InboxModel = require('../models/Inbox')

router.get('/getInbox', auth, async (req, res) => {
    InboxModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.post('/sendMessage', auth, async (req, res) => {
    const recieverEmail = req.body.reciever;
    const date = req.body.date;
    const subject = req.body.subject;
    const content = req.body.content;

    const newMessage = 
        new InboxModel({ 
            recieverEmail: recieverEmail, 
            date: date,
            subject: subject,
            content: content,
        });

await newMessage.save();
res.send("Sent Message!")
});


module.exports = router;