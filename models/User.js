const express = require('express');
const mongoose = require('mongoose');

// Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    loercase: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);
// 'users' is the databsase collection
// userSchema is my schema set up with name and password
