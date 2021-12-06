const express = require('express');
var cors = require('cors')
const connection = require('./dbConfig/db');
const PORT = process.env.PORT || 3003;
const app = express();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

//video call
require('dotenv').config();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

// Import models for testing
const UserModel = require('./models/User')
const AppointmentModel = require('./models/Appointment')
const ReportsModel = require('./models/Reports')
const InboxModel = require('./models/Inbox')
const FileModel = require ('./models/file')
const LocationModel = require('./models/Location');
// Test
// Initialize MongoDB Atlas connection
connection();

// Initialize middleware
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://gracious-lichterman-6add6d.netlify.app/");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, 'Content-Type' : 'multipart/form-data' ,* "
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
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
app.use('/doctors', require('./routes/doctorDemographics'));
app.use('/schedule', require('./routes/scheduled'))
app.use('/daysOff', require('./routes/daysOff'));
app.use('/notifs', require('./routes/notifications'));

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


server.listen(PORT, () => { console.log('Connection SUCCESSFUL') });
module.exports = app;