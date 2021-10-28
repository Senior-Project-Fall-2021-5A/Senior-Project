const express = require('express')
const router = express.Router();
const cors = require('cors')
const auth = require('../middleware/auth');
const InboxModel = require('../models/Inbox')

router.use(cors({origin: '*'}));

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
    const recieverEmail = req.body.reciever;
    const date = req.body.date;
    const subject = req.body.subject;
    const body = req.body.body;

    const newMessage = 
        new InboxModel({ 
            recieverEmail: recieverEmail, 
            date: date,
            subject: subject,
            body: body,
        });

await newMessage.save();
res.send("Sent Message!")
});


module.exports = router;