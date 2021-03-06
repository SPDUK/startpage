const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clockSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  clocklocation: {
    type: String,
    default: ''
  },
  // default format 3:31 PM Thursday June 7th 2018
  // 24hr: HH:mm dddd MMMM Do YYYY
  // no date: HH:mm A
  format: {
    type: String,
    default: 'h:mm A'
  },
  dateformat: {
    type: String,
    default: 'dddd MMMM Do YYYY'
  },
  displayclock: {
    type: Boolean,
    default: false
  }
});

module.exports = ClockModel = mongoose.model('clock', clockSchema);
