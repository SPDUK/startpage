const _ = require('lodash');
const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  // if data.name is not empty use data.name
  // if data.name is empty use an empty string
  data.name = !_.isEmpty(data.name) ? data.name : '';
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = 'Password must be between 6 and 100 characters';
  }
  if (!Validator.isLength(data.name, { min: 1, max: 40 })) {
    errors.name = 'Username must be between 1 and 40 characters';
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 100 })) {
    errors.password2 = 'Password must be between 6 and 100 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
