const upload = require("../middleware/file");
const express = require("express");
const router = express.Router();
const cors = require('cors')
const FileModel = require ('../models/file')

router.use(cors({origin: '*'}));

router.get('/getFile', async (req, res) => {
    FileModel.find( {}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        } 
    });
});

router.post("/uploadFile",upload.single('file'), async (req, res) => {
    /*
    if (req.file === undefined) return res.send("you must select a file.");
    return res.send('file upload'); 
    */
    const title = req.body.title;
    const timestamps = req.body.timestamps;

    const newFile = 
        new FileModel({ 
            title: title,
            timestamps: timestamps,
        });

await newFile.save();
res.send("File Upload!") 
});

module.exports = router;