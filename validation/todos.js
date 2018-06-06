const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateTodoInput(data) {
  const errors = {};
  data.todo = !_.isEmpty(data.todo) ? data.todo : '';
  if (!Validator.isLength(data.todo, { min: 1, max: 120 })) {
    errors.todo = 'Todos must be less than 120 characters';
  }
  if (Validator.isEmpty(data.todo)) {
    errors.todo = 'Todo field can not be empty';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
