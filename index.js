const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
