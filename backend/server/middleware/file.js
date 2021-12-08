const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const crypto = require('crypto');
const path = require('path')

const storage = new GridFsStorage({
    url: 'mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority',
    options: {useUnifiedTopology: true, useNewUrlParser: true},
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = `${file.originalname}`;
          const fileInfo = {
            filename: `${file.originalname}`,
            bucketName: 'files'
          };
          resolve(fileInfo);
        });
      });
    }
});
module.exports = multer({ storage });

