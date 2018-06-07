const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const { sanitizeBody } = require('express-validator/filter');
const moment = require('moment-timezone');

const app = express();
const users = require('./routes/api/users.js');
const todos = require('./routes/api/settings/todos.js');
const clock = require('./routes/api/settings/clock.js');

require('./config/passport')(passport);

require('dotenv').config({ path: 'variables.env' });

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
app.use(sanitizeBody('*').escape());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sets api to default to localhost:5000/api/users
app.use('/api/users', users);

// settings
app.use('/api/users/:user/todos', todos);
app.use('/api/users/:user/clock', clock);

// console.log(
//   moment()
//     .tz('Europe/London')
//     .format('HH:mm dddd MMMM Do YYYY')
// );

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
