const express = require('express');
const passport = require('passport');

const router = express.Router();

require('dotenv').config({ path: 'variables.env' });

const UserModel = require('../../../models/User.js');
const TodosModel = require('../../../models/Todos.js');
const ClockModel = require('../../../models/Clock.js');
const { sanitizeBody } = require('express-validator/filter');
const validateClockinput = require('../../../validation/todos');

const newClock = new ClockModel({
  user: user.id,
  location: req.body.location,
  twentyfour: req.body.twentyfour,
  displayseconds: req.body.displayseconds
});

// @route POST api/users/:user/clock
// @desc Set up clock timer
// @access Private
router.post('/', (req, res) => {
  // passes req.body through validation function
  // this function returns errors as an object and isValid as true or false
  const { errors, isValid } = validateClockInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
});

module.exports = router;
