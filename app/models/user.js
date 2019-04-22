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




// var UsersModel = function () {

//   var usersSchema = mongoose.Schema({
//     email: String
//   }, { collection: 'users' });

//   usersSchema.statics.getUser = function (userId) {
//     return this.findOne({ _id: userId }).then(function (user) {
//       return user;
//     });
//   };

//   return mongoose.model('Users', usersSchema);

// };

// module.exports = new UsersModel();