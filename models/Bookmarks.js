const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookmarksSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  bookmark: {
    type: String
  },
  icon: {
    type: String,
    default: 'fas fa-heart'
  }
});

module.exports = BookmarksModel = mongoose.model('bookmark', bookmarksSchema);
