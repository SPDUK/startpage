const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: 'variables.env' });

const router = express.Router();

// user Model
const UserModel = require('../../models/User.js');
const ClockModel = require('../../models/Clock.js');

// validation function
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // passes req.body through validation function
  // this function returns errors as an object and isValid as true or false
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // check mongoDB to see if any emails exist where req.body.email = User.email in database
  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'A user with this emaill already exists';
      return res.status(400).json(errors);
    }
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    // hash and salt the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(res.json({ completed: true }))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login a registered user & JWT auth
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // destructuring this breaks the code, do not destructure this!!
  const email = req.body.email;
  const password = req.body.password;
  // look through users collection where req.body.email = email field in users
  UserModel.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'Incorrect user / password combination';
      errors.password = 'Incorrect user / password combination';
      return res.status(400).json(errors);
    }
    // isMatch is the response of comparing password to user.password (true/false)
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // JWT payload
        const payload = { id: user.id, name: user.name };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60d' }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = 'Incorrect user / password combination';
        return res.status(400).json(errors);
      }
    });
  });
});

// TODO: set up a bcrypt.compare where user puts in an email and compare it to hashed email
// if no email exists send a fake notification saying it was sent even if it was not.
// if email = user.email then send a token

module.exports = router;
