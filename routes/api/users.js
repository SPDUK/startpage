const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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
  const email = req.body;
  const password = req.body;
  // check mongoDB to see if any emails exist where req.body.email = User.email in database
  User.findOne({ email }).then(user => {});
});

router.get('/login', (req, res) => {
  res.json({ message: 'Express is up!' });
});
module.exports = router;
