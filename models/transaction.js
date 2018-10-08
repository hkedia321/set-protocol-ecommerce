// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/setprotocol',{useNewUrlParser: true});

var Schema = mongoose.Schema;

// create a schema
var transactionSchema = new Schema({
  name: String,
  creditcardno: String,
  creditcarddate: String,
  cvv: String,
  otp: String,
  transactionid: String
}, { collection: 'transactions' });

// the schema is useless so far
// we need to create a model using it
var transactionsdata = mongoose.model('transactions', transactionSchema);

// make this available to our users in our Node applications
module.exports = transactionsdata;