const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const { check, validationResult } = require('express-validator');
var ObjectID = require('mongodb').ObjectId;


const User = require('../models/User');
const UserDemoModel = require('../models/UserDemographics');
const DoctorDemoModel = require('../models/DoctorDemographics');
const { route } = require('./appointment');
const UserModel = require('../models/User');

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

    const { name, email, password, role } = req.body;
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
        password,
        role
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

router.post('/updateUserCredentials/:userId', async (req, res) => {
  const updateFields = req.body;
  UserModel.findOneAndUpdate({_id: req.params.userId}, 
    updateFields, {new: true},
    (err, result) => {
        if (err) {
          res.send("Unable to update info for", {userId})
        } else {
          res.status(200).json(result);
        }
    })
});

router.post('/createUserProfile/:userId', async (req, res) => {
  const userUID = req.params.userId;
  const firstName = req.body.firstName;
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
  const isAdmin = req.body.isAdmin;

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
          isAdmin: isAdmin,
      });
  
  await newUserProfile.save();
  res.send("Added user info!")
})
// name, SSN, UID 
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
  const updateFields = req.body;
  UserDemoModel.findOneAndUpdate({userUID: req.params.userId}, 
    updateFields, {new: true},
    (err, result) => {
        if (err) {
          res.send("Unable to update info for", {userId})
        } else {
          res.status(200).json(result);
        }
    })
});

router.get('/searchPatients/:firstName/:lastName', async (req, res) => {
  UserDemoModel.find({
    $and: [
      { firstName: req.params.firstName },
      { lastName: req.params.lastName },
      { isAdmin: false }
    ]
  }, ['userUID', 'firstName', 'lastName'])
  .then(listOfUserIDs => {
    if (listOfUserIDs.length === 0) { return res.send("No user under that name")}
    return res.status(200).json(listOfUserIDs);
  })
  .catch(err => next(err));
});

router.get('/searchDoctor/:firstName/:lastName', async (req, res) => {
  UserDemoModel.find({
    $and: [
      { firstName: req.params.firstName },
      { lastName: req.params.lastName },
      { isAdmin: true}
    ]
  }, ['userUID', 'firstName', 'lastName'])
  .then(listOfUserIDs => {
    if (listOfUserIDs.length === 0) { return res.send("No user under that name")}
    return res.status(200).json(listOfUserIDs);
  })
  .catch(err => next(err));
});

router.get('/getDoctors', async (req, res) => {
  UserDemoModel.find( {isAdmin: true },['userUID', 'firstName', 'lastName'])
  .then(listOfUserIDs => {
    if (listOfUserIDs.length === 0) { return res.send("No doctor list")}
    return res.status(200).json(listOfUserIDs);
  })
  .catch(err => next(err));
});

router.get('/getPatients', async (req, res) => {
  UserDemoModel.find({ isAdmin: false },['userUID', 'firstName', 'lastName'])
  .then(listOfUserIDs => {
    if (listOfUserIDs.length === 0) { return res.send("No patients list")}
    return res.status(200).json(listOfUserIDs);
  })
  .catch(err => next(err));
});

router.get('/getPatientPcp/:userId', async (req, res) => {
  let pcp = await UserDemoModel.find({userUID: req.params.userId}, {_id: 0, primaryPhysician: 1})
  if (!pcp) { return res.send("No PCP for user")}
  return res.status(200).json(pcp)
});

router.get('/approvedDoctors/:userId', async (req, res) => {
  let approvedDoctors = await UserDemoModel.find({userUID: req.params.userId}, {_id: 0, approvedDoctors: 1})
  if (!approvedDoctors) { return res.send("No approved doctors for user")}
  let fieldOfStudy = []
  for (let i = 0; i < approvedDoctors.length; i++) {
    fieldOfStudy.push(approvedDoctors[i].approvedDoctors[i])
  }
  let approvedDoctorList = await DoctorDemoModel.find({fieldOfStudy: fieldOfStudy}, {_id: 0, doctorUID: 1, fieldOfStudy: 1})
  if (approvedDoctorList === 0) { return res.send("Invalid field of study")}
  return res.status(200).json(approvedDoctorList)
});

module.exports = router;