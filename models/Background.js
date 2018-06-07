const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const backgroundSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  background: {
    type: String,
    required: true
  }
});

module.exports = BackgroundModel = mongoose.model('background', backgroundSchema);
