const express = require('express');
const connectDB = require('./config/db');
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
app.use(express.json({ extended: false }));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/appointments', require('./routes/appointment'));
app.use('/reports', require('./routes/report'));
app.use('/inbox', require('./routes/inbox'));

// Test auth
app.post('/register', async (req, res) => {
    
    const newTestUser = new UserModel({ 
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'password',
    });
    await user.save();
    res.send('User Added!')
})


app.listen(PORT, () => { console.log('Connection SUCCESSFUL') });

module.exports = app;