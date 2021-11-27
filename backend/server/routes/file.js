const upload = require("../middleware/file");
const express = require("express");
const router = express.Router();
const cors = require('cors')
const FileModel = require ('../models/file');
const file = require("../middleware/file");
var ObjectID = require('mongodb').ObjectId;

router.use(cors({origin: '*'}));

router.get('/getFiles', async (req, res) => {
    FileModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.get('/getFiles/:userId', async (req, res) => {
    FileModel.find({
        $or: [
            { userUID: req.params.userId },
            { doctorUID: req.params.userId }
        ]
    })
    .then(file => {
        if (!file) { return res.send("No documents for User")}
        return res.status(200).json(file);
    })
    .catch(err => next(err));
});

router.post("/uploadFiles",upload.single('file'), async (req, res) => {
    /*
    if (req.file === undefined) return res.send("you must select a file.");
    return res.send('file upload'); 
    */
    const title = req.body.title;
    const description = req.body.description;
    const file_path = req.body.file_path;
    const file_minetype = req.body.file_minetype;
    const timestamps = req.body.timestamps;

     // Turn string input into ObjectIDs
    const userObjId = new ObjectID(userUID);
    const doctorObjId = new ObjectID(doctorUID);
    const fileObjId = new ObjectID(fileUID);

    const newFile = 
        new FileModel({ 
            title: title,
            description: description,
            file_path: file_path,
            file_minetype: file_minetype,
            timestamps: timestamps,
        });

await newFile.save();
res.send("File Upload!") 
});

module.exports = router;