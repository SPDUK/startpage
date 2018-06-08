const express = require('express');
const passport = require('passport');

const axios = require('axios');

const router = express.Router();

const UserModel = require('../../../models/User.js');
const WeatherModel = require('../../../models/Weather');

const validateWeatherInput = require('../../../validation/weather');

// @route GET api/users/weather
// @desc view the current weather settings for the user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    WeatherModel.findOne({ user: req.user.id }).then(weather => res.json(weather));
  });
});

// @route POST api/users/weather
// @desc Set up weather location
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateWeatherInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  WeatherModel.findOne({ user: req.user.id }).then(user => {
    // if there is a weather setting already set up for the user, update that instead of making a new one
    if (user) {
      WeatherModel.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            name: req.body.name || user.name,
            temptype: req.body.temptype || user.temptype,
            displayweather: req.body.displayweather || user.displayweather
          }
        },
        { new: true }
      )
        .then(weather => res.json(weather))
        .catch(err =>
          res.status(404).json({ weatherError: 'There was an error with weather settings' })
        );
      // if the user does not have a weather setting set up, create a new one
    } else {
      const newWeather = new WeatherModel({
        user: req.user.id,
        name: req.body.name,
        temptype: req.body.temptype,
        displayweather: req.body.displayweather
      });
      newWeather
        .save()
        .then(weather => res.json(weather))
        .catch(err =>
          res
            .status(401)
            .json({ createWeatherErr: 'There was an error creating the weather settings' })
        );
    }
  });
});
const key = '1e252c6355bd41b138ceaf1cc03e0538';

const url = `http://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=${key}`;
router.get('/test', (req, res) => {
  axios
    .get(url)
    .then(data => {
      res.json(data.data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
