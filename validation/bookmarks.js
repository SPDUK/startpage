const Validator = require('validator');
const _ = require('lodash');

// TODO: go through validations and check + capitalize / spelling etc
module.exports = function validateTodoInput(data) {
  const errors = {};
  data.bookmark = !_.isEmpty(data.bookmark) ? data.bookmark : '';
  data.icon = !_.isEmpty(data.icon) ? data.icon : '';
  data.name = !_.isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.bookmark, { min: 1, max: 250 })) {
    errors.bookmark = 'Bookmark link must be less than 250 characters';
  }

  if (Validator.isEmpty(data.bookmark)) {
    errors.bookmark = 'Bookmark field can not be empty';
  }
  if (!Validator.isLength(data.icon, { min: 1, max: 120 })) {
    errors.icon = 'Icon length must be less than 120 characters';
  }

  if (Validator.isEmpty(data.icon)) {
    errors.icon = 'Icon field can not be empty';
  }

  if (!Validator.isLength(data.name, { min: 1, max: 120 })) {
    errors.name = 'Name length must be less than 120 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field can not be empty';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
