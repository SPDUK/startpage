const express = require('express');
const passport = require('passport');

const router = express.Router();

const UserModel = require('../../../models/User.js');
const TodosModel = require('../../../models/Todos.js');
const { sanitizeBody } = require('express-validator/filter');
const validateTodoInput = require('../../../validation/todos');

// @route GET api/users/:user/todos
// @desc list all of the current todos for a logged in user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find what user is opening the page
  UserModel.findOne({ user: req.user.id }).then(user => {
    TodosModel.find({ user: req.user.id }).then(todos => res.json(todos));
  });
});

// @route POST api/users/:user/todos
// @desc create a new todo for a logged in user
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  sanitizeBody('todo');
  sanitizeBody('completed');
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

// @route UPDATE api/users/:user/todos/:todo_id
// @desc update a todo and or completed status
// @access Private
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  sanitizeBody('todo');
  sanitizeBody('completed');
  const { errors, isValid } = validateTodoInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  UserModel.findOne({ user: req.user.id })
    .then(user => {
      TodosModel.findById(req.params.id).then(todo => {
        // if the user.id making the request is not the same as the jWT.id stop
        if (todo.user.toString() !== req.user.id.toString()) {
          return res.status(401).json({ notauthorized: 'User is not authoritzed ' });
        }
        // if the todo or completed field has a new input  - update it, else leave it as it was
        todo
          .update({
            $set: {
              todo: req.body.todo || todo.todo,
              completed: req.body.completed || todo.completed
            }
          })
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({
              todoError:
                'Todos must be between 1 and 120 characters, Completed must be true or false'
            })
          );
      });
    })
    .catch(err => res.status(404).json({ nopostfound: 'No todo was found with that ID' }));
});

// @route DELETE api/users/:user/todos/:todo_id
// @desc delete a specific todo
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOne({ user: req.user.id })
    .then(user => {
      TodosModel.findById(req.params.id).then(todo => {
        // if the user.id making the request is not the same as the jWT.id stop
        if (todo.user.toString() !== req.user.id.toString()) {
          return res.status(401).json({ notauthorized: 'User is not authoritzed ' });
        }
        // if the user.id and the JWT.id are the same then the user owns this todo - delete it
        todo.remove().then(() => res.json({ success: true }));
      });
    })
    .catch(err => res.status(404).json({ nopostfound: 'No todo was found with that ID' }));
});

// TODO: add update & edit with front-end using parms
module.exports = router;
