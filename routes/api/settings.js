const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');

const router = express.Router();

require('dotenv').config({ path: 'variables.env' });

const UserModel = require('../../models/User.js');
const SettingsModel = require('../../models/Settings.js');

// @route GET api/users/:user/settings
// @desc get profile by user ID
// @access Private
// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({
//     message: 'hey!!!'
//   });-
// });

// @route GET api/users/:user/settings/current
// @desc Test who the current user is
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOne({ user: req.user.id }).then(user => {
    const newTodo = new SettingsModel({
      user: req.user.id,
      todo: req.body.todo,
      completed: req.body.completed
    });
    // just test stuff
    newTodo.save().then(post =>
      res.json({
        post,
        user: req.user
      })
    );
  });
});

module.exports = router;
