const _ = require('lodash');
const Validator = require('validator');
// name, temptype, displayweather

module.exports = function validateWeatherInput(data) {
  const errors = {};
  if (data.temptype) data.temptype = data.temptype.toLowerCase();
  if (data.name) data.name = data.name.toLowerCase();
  // if data.name is not empty use data.name
  // if data.name is empty use an empty string
  data.name = !_.isEmpty(data.name) ? data.name : '';
  data.temptype = !_.isEmpty(data.temptype) ? data.temptype : '';

  if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
    errors.name = 'City name must be between 2 and 100 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'City name field is required';
  }

  if (Validator.isEmpty(data.temptype)) {
    errors.temptype = 'Temperature field is required';
  }

  if (data.temptype !== 'metric' && data.temptype !== 'imperial') {
    errors.temptype = 'Temperature type must be in Metric(celcius) or Imperial(fahrenheit)';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
