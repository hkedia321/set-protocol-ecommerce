var express = require('express');
var router = express.Router();
var request = require('request');
const JSEncrypt = require('node-jsencrypt');
const jsEncrypt = new JSEncrypt();
const keys = require('./keys-data');
var sess;
// grab the model
var User = require('../models/users');
/* GET home page. */

/* GET purchase page */
router.get('/purchase', function(req, res, next) {
	sess = req.session;
	if (true || sess.username) {
		res.render('purchase', { 
			username: "sess.username", 
			name: "sess.name", 
			bankPublicKey: keys.bank.public,
			merchantPublicKey: keys.merchant.public
		});
	}
	else {
		res.redirect('/login');
	}
});

/* POST purchase submit */
router.post('/purchase/submit', function(req, res, next) {
	var pimd = req.body.pimd;
	var oimd = req.body.oimd;
	jsEncrypt.setPrivateKey(keys.merchant.private);
	var decrypted = jsEncrypt.decrypt(oimd);
	var merchantDecrypted = JSON.parse(decrypted);
	console.log("merchantDecrypted:");
	console.log(merchantDecrypted);
	var phone =merchantDecrypted.phone;
	// Verify from bank
	request('http://localhost:4000/bank/verify?phone='+phone+'&pimd='+(pimd), function (error, response, body) {
		if (JSON.parse(body).success === 1) {
			res.json({success: 1, redirect: '/purchase-verification?success=1&phone=' + phone + '&transactionid=' + JSON.parse(body).transactionid});
		}
		else {
			res.json({success: 0});
		}
	});
});

module.exports = router;
