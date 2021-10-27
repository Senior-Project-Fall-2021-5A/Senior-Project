const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const LocationModel = require('./models/Location');
const file = require('./models/file');
const app = express()

var authRoutes = require('./routes/auth')

// MONGODB ATLAS CONNECTION
mongoose.connect('mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes)

/// This is the test route to insert location data 
app.get('/insert', async (req, res) => {   
    const Location = new LocationModel({name: "doctorLocation", address1: "1234 Doctor Address Lane", city: "Kennesaw", state: "GA", zip:"12345"})
    await Location.save()
    res.send('Data Insert Successful')
});

app.get('/read', async (req, res) => {
    LocationModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/// upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filePath = `file/${id}${ext}`;
        file.create({ filePath: filePath })
            .then(() => {
                cb(null, filePath)
            });
    }
})

const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/upload', upload.array('file'), (req, res) => {
    return res.redirect('/');
});

app.get('/file', (req, res) => {
    file.find()
        .then((files) => {
            return res.json({ status: 'OK', files});
        })
});


app.listen(process.env.PORT || 3002, () => {
    console.log('Connection SUCCESSFUL')
});

module.exports = app;