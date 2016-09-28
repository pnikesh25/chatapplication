var mongoose = require('mongoose');

var user = mongoose.Schema({
  "username" : String,
  "password" : String,
  "online" : Boolean
})

var User = mongoose.model('User', user);

module.exports = User;
