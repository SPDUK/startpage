const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO: maybe change todos into array of strings & add/remove them by their index, do it later
const todosSchema = new Schema({
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

module.exports = TodosModel = mongoose.model('todos', todosSchema);
