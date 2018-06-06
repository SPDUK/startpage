const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = SettingsModel = mongoose.model('settings', settingsSchema);
