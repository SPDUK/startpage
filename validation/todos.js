const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateTodoInput(data) {
  const errors = {};
  data.todo = !_.isEmpty(data.todo) ? data.todo : '';
  // data.completed = !_.isBoolean(data.completed) ? data.completed : false;
  if (!Validator.isLength(data.todo, { min: 1, max: 120 })) {
    errors.todo = 'Todos must be between 1 and 120 characters';
  }
  if (Validator.isEmpty(data.todo)) {
    errors.todo = 'Todo field can not be empty';
  }
  // if (_.isBoolean(data.completed)) {
  //   data.completed = false;
  //   errors.completed = 'The completed field should be true or false';
  // }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
