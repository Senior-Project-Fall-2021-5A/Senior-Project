const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    reportUID:{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
      },
    title: {
        type: String,
        required: false,
        trim: true
      },
      description: {
        type: String,
        required: false,
        trim: true
      },
      file_path: {
        type: String,
        required: false
      },
      file_mimetype: {
        type: String,
        required: false
      }
    },
    {
      timestamps: false
    },
);

const File = mongoose.model('File', fileSchema);
module.exports = File;
