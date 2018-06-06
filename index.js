const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const path = require('path');

const app = express();
const users = require('./routes/api/users.js');
const todos = require('./routes/api/settings/todos.js');

require('./config/passport')(passport);

require('dotenv').config({ path: 'variables.env' });

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sets api to default to localhost:5000/api/users
app.use('/api/users', users);

// settings
app.use('/api/users/:user/todos', todos);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
