const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('..models/User')
const mongoose = require('mongoose');

import * as Constants from './server/Constants'

var router = require('express').Router()

mongoose.connect(Constants.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => {
    // Only listen to requests once DB is loaded
    router.listen(process.env.PORT, () => console.log('Server is live!'))
})
.catch(err => console.log(err))

router.post('/register', async (req, res) => {

    const user = req.body;

    // Check if username or email has been taken by another user already
    const takenUsername = await User.findOne({ username: user.username })
    const takenEmail = await User.findOne({ email: user.email })

    if (takenUsername || takenEmail) {
        res.json({ message: 'Username or email has been taken' })
    } else {
        // Defines how many rounds of the hashing algorithm will occur (param2 = n => 2^n)
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({ message: 'Success'} )
    }
})

router.post('/login', (req, res) => {

    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username })
    .then(dbUser => {
        if (!dbUser) {
            return res.json({
                message: 'Invalid username or password'
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    is: dbUser._id,
                    username: dbUser.username,
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.json({ message: err })
                        return res.json({
                            message: 'Success',
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                return res.json({
                    message: 'Invalid Username or Password'
                })
            }
        })
    })
})


