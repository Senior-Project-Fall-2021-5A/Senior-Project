/* const upload = require("../middleware/file");
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

router.get('/getFiles/:reportId', async (req, res) => {
    FileModel.find({reportUID: req.params.reportId})
    .then(file => {
        if (!file) { return res.send("No documents for User")}
        return res.status(200).json(file);
    })
    .catch(err => next(err));
});

router.post("/uploadFiles", upload.single('file'), async (req, res) => {
    const reportUID = req.body.reportUID;
    const title = req.body.title;
    const description = req.body.description;
    const file_path = req.body.file_path;
    const file_minetype = req.body.file_minetype;
    const timestamps = req.body.timestamps;

     // Turn string input into ObjectIDs

    const newFile = 
        new FileModel({ 
            reportUID: reportUID,
            title: title,
            description: description,
            file_path: file_path,
            file_minetype: file_minetype,
            timestamps: timestamps,
        });

await newFile.save();
res.send("File Upload!") 
});

module.exports = router; */

const router = require('express').Router();
const multer = require('multer');
const { mongo, connection } = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongo;
var gfs = Grid(connection.db);

// set up connection to db for file storage
const storage = require('multer-gridfs-storage')({
  db: connection.db,
  file: (req, file) => {
    return {
      filename: file.originalname
    }
  }
});

// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');
router.get('/files/:filename', (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    var readstream = gfs.createReadStream({
      filename: files[0].filename
    })
    res.set('Content-Type', files[0].contentType);
    return readstream.pipe(res);
  });
});

router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find files"
      });
    }
    return res.json(files);
  });
});

router.post('/files', singleUpload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      file: req.file
    });
  }
  res.send({ success: false });
});

router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
    })
});

module.exports = router;