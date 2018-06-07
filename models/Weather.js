const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    default: 'London'
  },
  temptype: {
    type: String,
    default: 'metric',
    lowercase: true
  },
  displayweather: {
    type: Boolean,
    default: true
  }
});
module.exports = WeatherModel = mongoose.model('weather', weatherSchema);
