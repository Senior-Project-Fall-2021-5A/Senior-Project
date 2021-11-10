const express = require('express');
var cors = require('cors')
const connection = require('./dbConfig/db');
const PORT = process.env.PORT || 3003;
const app = express();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");


// Import models for testing
const UserModel = require('./models/User')
const AppointmentModel = require('./models/Appointment')
const ReportsModel = require('./models/Reports')
const InboxModel = require('./models/Inbox')
const FileModel = require ('./models/file')
const LocationModel = require('./models/Location');

// Initialize MongoDB Atlas connection
connection();

// Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));
let gfs;
const conn = mongoose.connection;

conn.once("open", function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('upload');
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/appointments', require('./routes/appointment'));
app.use('/reports', require('./routes/reports'));
app.use('/inbox', require('./routes/inbox'));
app.use('/file', require('./routes/file'));
app.use('/location', require('./routes/location'));

// Test auth
app.get('/register', async (req, res) => {
    
    const newTestUser = new UserModel({ 
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'password',
    });
    await newTestUser.save();
    res.send('User Added!')
})

app.listen(PORT, () => { console.log('Connection SUCCESSFUL') });

module.exports = app;