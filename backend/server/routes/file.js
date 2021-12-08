const crypto = require("crypto");
const multer = require("multer");
const {GridFsStorage}= require("multer-gridfs-storage");
const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");

router.use(cors({origin: '*'}));

const mongoURI = "mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority";

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  // init gfs
  let gfs;
  conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
    });
  });

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({
    storage
  });
// get / page
router.get("/", (req, res) => {
  if(!gfs) {
    console.log("some error occured, check connection to db");
    res.send("some error occured, check connection to db");
    process.exit(0);
  }
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.render("index", {
        files: false
      });
    } else {
      const f = files
        .map(file => {
          if (
            file.contentType === "image/png" ||
            file.contentType === "image/jpeg"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });

      return res.render("index", {
        files: f
      });
    }

    // return res.json(files);
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  // res.json({file : req.file})
  const filename = req.file.filename;
  return res.status(200).json(filename);
  
});

router.get("/getFiles", (req, res) => {
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist"
      });
    }

    return res.json(files);
  });
});

router.get("/getFiles/:filename", (req, res) => {
    const file =gfs
    .find({
        filename: req.params.filename
    })
    .toArray((err, file) => {
      if (!file) {
        return res.status(404).json({
          err: "no files exist"
        });
      }

      return res.json(file);
    });
});

router.get("/image/:filename", (req, res) => {
  // console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

// files/del/:id
// Delete chunks from the db
router.post("/files/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.redirect("/");
  });
});

module.exports = router;