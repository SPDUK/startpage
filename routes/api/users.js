const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const router = express.Router();

// user Model
const UserModel = require('../../models/User.js');
// validation function
const validateRegisterInput = require('../../validation/register');

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
  const email = req.body.email;
  const password = req.body.password;
  // check mongoDB to see if any emails exist where req.body.email = User.email in database
  UserModel.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'A user with this emial already exists';
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

router.get('/login', (req, res) => {
  res.json({ message: 'Express is up!' });
});
module.exports = router;
