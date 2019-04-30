'use strict';

let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// User Schema
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator, { message: 'Email or username already exists.' });

let User = module.exports = mongoose.model('User', userSchema);