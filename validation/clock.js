// TODO: if lodash isn't used much elsewhere change for just isEmpty module
const _ = require('lodash');
const Validator = require('validator');

module.exports = function validateClockInput(data) {
  const errors = {};

  data.clocklocation = !_.isEmpty(data.clocklocation) ? data.clocklocation : '';
  data.format = !_.isEmpty(data.format) ? data.format : '';

  if (Validator.isEmpty(data.clocklocation)) {
    errors.clocklocation = 'Location field is required';
  }

  if (Validator.isEmpty(data.format)) {
    errors.format = 'Format field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
