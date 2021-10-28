const express = require('express');
var cors = require('cors')
const connectDB = require('./dbConfig/db');
const PORT = process.env.PORT || 3002;
const app = express();


// Import models for testing
const UserModel = require('./models/User')
const AppointmentModel = require('./models/Appointment')
const ReportsModel = require('./models/Reports')
const InboxModel = require('./models/Inbox')


// Initialize MongoDB Atlas connection
connectDB();

// Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/appointments', require('./routes/appointment'));
app.use('/reports', require('./routes/reports'));
app.use('/inbox', require('./routes/inbox'));

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



/* upload file
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
            return res.json({ status: 'OK', files });
        })
});
*/
app.listen(PORT, () => { console.log('Connection SUCCESSFUL') });

module.exports = app;