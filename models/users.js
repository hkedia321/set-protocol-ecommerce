// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/setprotocol');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: String,
  name: String,
  password: String,
}, { collection: 'users' });

// the schema is useless so far
// we need to create a model using it
var usersdata = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = usersdata;