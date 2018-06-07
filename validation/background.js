const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateBackgroundInput(data) {
  const errors = {};
  data.background = !_.isEmpty(data.background) ? data.background : '';

  if (!Validator.isLength(data.background, { min: 1, max: 120 })) {
    errors.background = 'backgrounds must be less than 200 characters';
  }
  if (Validator.isEmpty(data.background)) {
    errors.background = 'background field can not be empty';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
