const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateBackgroundInput(data) {
  const errors = {};
  data.background = !_.isEmpty(data.background) ? data.background : '';

  if (!Validator.isLength(data.background, { min: 1, max: 200 })) {
    errors.background = 'Background URL must be less than 200 characters';
  }
  if (Validator.isEmpty(data.background)) {
    errors.background = 'Background field cannot be empty';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
