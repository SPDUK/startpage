const express = require('express');
const passport = require('passport');

const axios = require('axios');

const router = express.Router();

const UserModel = require('../../../models/User.js');
const ClockModel = require('../../../models/Clock.js');
const validateClockInput = require('../../../validation/clock');
// user, clocklocation, format, displayclock

// @route GET api/users/clock
// @desc view the current clock settings for the user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    ClockModel.findOne({ user: req.user.id }).then(clock => res.json(clock));
  });
});

// @route POST api/users/clock
// @desc Set up clock timer
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateClockInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  ClockModel.findOne({ user: req.user.id }).then(user => {
    // if there is a clock already set up for the user, update that instead of making a new one
    if (user) {
      ClockModel.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            clocklocation: req.body.clocklocation || user.clocklocation,
            format: req.body.format || user.format,
            displayclock: req.body.displayclock || user.displayclock,
            dateformat: req.body.dateformat || user.dateformat
          }
        },
        { new: true }
      )
        .then(clock => res.json(clock))
        .catch(err =>
          res.status(401).json({ clockError: 'There was an error with clock settings' })
        );
      // if the user does not have a clock set up, create a new one
    } else {
      const newClock = new ClockModel({
        user: req.user.id,
        clocklocation: req.body.clocklocation,
        format: req.body.format,
        displayclock: req.body.displayclock,
        dateformat: req.body.dateformat
      });
      newClock
        .save()
        .then(clock => res.json(clock))
        .catch(err =>
          res.status(401).json({ createClockErr: 'There was an error creating the clock settings' })
        );
    }
  });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
