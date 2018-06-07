const express = require('express');
const passport = require('passport');

const router = express.Router();

const UserModel = require('../../../models/User.js');
const BackgroundModel = require('../../../models/Background');

const validateBackgroundInput = require('../../../validation/background');

// @route GET api/users/:user/background
// @desc view the current background settings for the user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    BackgroundModel.findOne({ user: req.user.id }).then(background => res.json(background));
  });
});

// @route POST api/users/:user/background
// @desc Set up background timer
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateBackgroundInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  BackgroundModel.findOne({ user: req.user.id }).then(user => {
    // if there is a background already set up for the user, update that instead of making a new one
    if (user) {
      BackgroundModel.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            background: req.body.background || user.background
          }
        },
        { new: true }
      )
        .then(background => res.json(background))
        .catch(err =>
          res.status(404).json({ backgroundError: 'There was an error with background settings' })
        );
      // if the user does not have a background set up, create a new one
    } else {
      const newbackground = new BackgroundModel({
        user: req.user.id,
        background: req.body.background
      });
      newbackground
        .save()
        .then(background => res.json(background))
        .catch(err =>
          res
            .status(401)
            .json({ createbackgroundErr: 'There was an error creating the background settings' })
        );
    }
  });
});

module.exports = router;
