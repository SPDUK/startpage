const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const { sanitizeBody } = require('express-validator/filter');
// TODO: remove unused things eg: axios
const app = express();
const users = require('./routes/api/users.js');
const todos = require('./routes/api/settings/todos.js');
const clock = require('./routes/api/settings/clock.js');
const weather = require('./routes/api/settings/weather.js');
const bookmarks = require('./routes/api/settings/bookmarks.js');
const background = require('./routes/api/settings/background.js');

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

// settings sets defaults in each to api/users/:user/*
app.use('/api/users/todos', todos);
app.use('/api/users/clock', clock);
app.use('/api/users/weather', weather);
app.use('/api/users/bookmarks', bookmarks);
app.use('/api/users/background', background);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
