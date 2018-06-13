const _ = require('lodash');
const Validator = require('validator');

module.exports = function validateClockInput(data) {
  const errors = {};

  data.clocklocation = !_.isEmpty(data.clocklocation) ? data.clocklocation : '';
  data.format = !_.isEmpty(data.format) ? data.format : '';
  data.dateformat = !_.isEmpty(data.dateformat) ? data.dateformat : '';

  if (Validator.isEmpty(data.clocklocation)) {
    errors.clocklocation = 'Try again, if this fails try using timezones eg. GMT+2';
  }

  if (Validator.isEmpty(data.format)) {
    errors.format = 'Format field is required';
  }
  if (Validator.isEmpty(data.dateformat)) {
    errors.dateformat = 'Date Format field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
