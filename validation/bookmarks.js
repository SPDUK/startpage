const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateTodoInput(data) {
  const errors = {};
  data.bookmark = !_.isEmpty(data.bookmark) ? data.bookmark : '';
  data.icon = !_.isEmpty(data.icon) ? data.icon : '';

  if (!Validator.isLength(data.bookmark, { min: 1, max: 120 })) {
    errors.bookmark = 'bookmarks must be less than 120 characters';
  }
  if (Validator.isEmpty(data.bookmark)) {
    errors.bookmark = 'bookmark field can not be empty';
  }
  if (!Validator.isLength(data.icon, { min: 1, max: 120 })) {
    errors.icon = 'icon length must be less than 120 characters';
  }
  if (Validator.isEmpty(data.icon)) {
    errors.icon = 'icon field can not be empty';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
