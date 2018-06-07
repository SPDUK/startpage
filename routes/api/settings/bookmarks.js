const express = require('express');
const passport = require('passport');

const router = express.Router();

require('dotenv').config({ path: 'variables.env' });

const UserModel = require('../../../models/User.js');
const Bookmark = require('../../../models/Todos.js');
const BookmarksModel = require('../../../models/Bookmarks.js');

const { sanitizeBody } = require('express-validator/filter');

const validateBookmarksInput = require('../../../validation/bookmarks.js');

// @route GET api/users/:user/bookmarks
// @desc list all of the current bookmarks for a logged in user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    BookmarksModel.find({ user: req.user.id }).then(bookmarks => res.json(bookmarks));
  });
});

// @route POST api/users/:user/bookmarks
// @desc create a new bookmark for a logged in user
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  sanitizeBody('bookmark');
  sanitizeBody('icon');
  const { errors, isValid } = validateBookmarksInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newBookmark = new BookmarksModel({
    user: req.user.id,
    bookmark: req.body.bookmark,
    icon: req.body.icon
  });
  newBookmark
    .save()
    .then(bookmark =>
      res.json({
        bookmark,
        user: req.user
      })
    )
    .catch(err => res.status(404).json({ bookmarkError: 'There was an error with bookmarks' }));
});

// @route UPDATE api/users/:user/bookmarks/:id
// @desc update a bookmark and or icon
// @access Private
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  sanitizeBody('bookmark');
  sanitizeBody('icon');
  const { errors, isValid } = validateBookmarksInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  BookmarksModel.findOne({ user: req.user.id })
    .then(user => {
      BookmarksModel.findById(req.params.id).then(bookmark => {
        // if the user.id making the request is not the same as the jWT.id stop
        if (bookmark.user.toString() !== req.user.id.toString()) {
          return res.status(401).json({ notauthorized: 'User is not authoritzed ' });
        }
        bookmark
          .update({
            $set: {
              bookmark: req.body.bookmark,
              icon: req.body.icon
            }
          })
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({
              todoError:
                'Bookmarks Error: Bookmarks must be between 1 and 120 characters and not empty.'
            })
          );
      });
    })
    .catch(err => res.status(404).json({ nopostfound: 'No bookmark was found with that ID' }));
});

// @route DELETE api/users/:user/bookmarks/:id
// @desc delete a specific bookmark
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOne({ user: req.user.id })
    .then(user => {
      BookmarksModel.findById(req.params.id).then(bookmark => {
        if (bookmark.user.toString() !== req.user.id.toString()) {
          return res.status(401).json({ notauthorized: 'User is not authoritzed ' });
        }
        bookmark.remove().then(() => res.json({ success: true }));
      });
    })
    .catch(err => res.status(404).json({ nopostfound: 'No bookmark was found with that ID' }));
});

module.exports = router;
