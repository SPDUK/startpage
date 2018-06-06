const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportJWT = require('passport-jwt');

// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;
const router = express.Router();

// user Model
const UserModel = require('../../models/User.js');
// validation function
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/register');

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
          .then(console.log(newUser))
          .then(newSavedUser => res.json(newSavedUser))
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
  // email = req.body.email from the post request to api/users/login
  const email = req.body;
  const password = req.body;
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
        const payload = { id: user.id, name: user.name };
      }
    });
  });
});

module.exports = router;
