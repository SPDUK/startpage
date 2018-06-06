// TODO: if lodash isn't used much elsewhere change for just isEmpty module
const _ = require('lodash');
const Validator = require('validator');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // returns an object with two properties errors and isValid,
  // errors.email = "email is invalid"
  // isValid: true
  return {
    errors,
    // if there are no errors (errors is blank) then it returns true
    // if there are any errors inside the error object it returns false and is not valid
    isValid: _.isEmpty(errors)
  };
};
