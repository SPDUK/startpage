const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');
const _ = require('lodash');

const router = express.Router();

require('dotenv').config({ path: 'variables.env' });

const UserModel = require('../../../models/User.js');
const TodosModel = require('../../../models/Todos.js');
const { sanitizeBody } = require('express-validator/filter');
const validateTodoInput = require('../../../validation/todos');

// @route POST api/users/:user/todos
// @desc create a new todo for a logged in user
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOne({ user: req.user.id }).then(user => {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newTodo = new TodosModel({
      user: req.user.id,
      todo: req.body.todo,
      completed: req.body.completed
    });
    // just test stuff
    newTodo
      .save()
      .then(post =>
        res.json({
          post,
          user: req.user
        })
      )
      .catch(err => res.status(404).json({ todoError: 'There was an error with todo' }));
  });
});

// @route GET api/users/:user/todos
// @desc list all of the current todos for a logged in user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    TodosModel.find({ user: req.user.id }).then(posts => res.json(posts));
  });
});

module.exports = router;
