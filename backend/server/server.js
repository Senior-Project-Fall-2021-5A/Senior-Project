const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Bodyparser middleware to recieve form data
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlEncodedParser)

// Connect to MongoDB database
const dbURI = 
'mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => {
    // Only listen to requests once DB is loaded
    app.listen(process.env.PORT, () => console.log('Server is live!'))
})
.catch(err => console.log(err))