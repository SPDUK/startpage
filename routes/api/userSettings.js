const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');

const router = express.Router();

require('dotenv').config({ path: 'variables.env' });

// @route GET api/users/:user/settings
// @desc get profile by user ID
// @access Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'hey!!!'
  });
});

module.exports = router;
