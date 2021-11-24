const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const { check, validationResult } = require('express-validator');
var ObjectID = require('mongodb').ObjectId;


const User = require('../models/User');
const UserDemoModel = require('../models/UserDemographics')

router.use(cors({origin: '*'}));

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please make sure your email is valid').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check(
      'password',
      'Pease enter a password with 20 or less characters'
    ).isLength({ max: 20 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ param: 'email', msg: 'Email address already exists' }]
        });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      delete user.password;

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

router.post('/createUserProfile/:userId', async (req, res) => {
  const userUID = req.params.userId;
  const firstName = req.body.firstname;
  const midName = req.body.midName;
  const lastName = req.body.lastName;
  const DoB = req.body.DoB;
  const gender = req.body.gender;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const email = req.body.email;
  const phone1 = req.body.phone1;
  const phone2 = req.body.phone2;
  const phone3 = req.body.phone3;
  const Insurance01UID = req.body.Insurance01UID;
  const Insurance02UID = req.body.Insurance02UID;
  const Insurance03UID = req.body.Insurance03UID;
  const primaryPhysician = req.body.primaryPhysician;
  const approvedDoctors = req.body.approvedDoctors;

  const userObjId = new ObjectID(userUID);

  const newUserProfile = 
      new UserDemoModel({
          userUID: userObjId,
          firstName: firstName,
          midName: midName,
          lastName: lastName,
          DoB: DoB,
          gender: gender,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          email: email,
          phone1: phone1,
          phone2: phone2,
          phone3: phone3,
          Insurance01UID: Insurance01UID,
          Insurance02UID: Insurance02UID,
          Insurance03UID: Insurance03UID,
          primaryPhysician: primaryPhysician,
          approvedDoctors: approvedDoctors,
      });
  
  await newUserProfile.save();
  res.send("Added user info!")
})

router.get('/getUserInfo/:userId', async (req, res) => {
  UserDemoModel.find({ 
      userUID: req.params.userId
  })
  .then(userInfo => {
      if (!userInfo) {return res.send("No Info for User")}
      return res.status(200).json(userInfo);
  })
  .catch(err => next(err));
});

router.post('/updateUserInfo/:userId', async (req, res) => {
  UserDemoModel.findOneAndUpdate({userUID: req.params.userId, new: true},
      {
        $set: {
            firstName: req.body.firstName,
            midName: req.body.midName,
            lastName: req.body.lastName,
            DoB: req.body.DoB,
            gender: req.body.gender,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            phone3: req.body.phone3,
            Insurance01UID: req.body.Insurance01UID,
            Insurance02UID: req.body.Insurance02UID,
            Insurance03UID: req.body.Insurance03UID,
            primaryPhysician: req.body.primaryPhysician,
            approvedDoctors: req.body.approvedDoctors,
        },
      },
      (err, result) => {
          if (err) {
              res.send("Unable to update info for", {userId})
          } else {
              res.status(200).json(result);
          }
      })
})
module.exports = router;