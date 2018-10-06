var express = require('express');
var router = express.Router();
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
	// var erc = "sdvYJGVRpD0TGnnlGkTRu1XL31T/+9nJk8OjiQipvP2iQCDdGUnhYxYeJUgc6qNlJJxvHqFp9ei8k+gOCjEaUVyDmX8SQGp2tTI3dN45WDLpcHH2DhEGkLx6C6nP7WTv/v0W4ZyiIDmdDXdBZbVIqGAlau9RFq8HBxUpOoKjJTQ=";
	// jsEncrypt.setPrivateKey(keys.bank.private);
	// var decrypted = jsEncrypt.decrypt(erc);
	// console.log("answer:");
	// console.log(decrypted);
	if (true || sess.username) {
		res.render('purchase', { 
			username: "sess.username", 
			name: "sess.name", 
			bankPublicKey: keys.bank.public,
			merchantPublicKey: keys.merchant.public,
		});
	}
	else {
		res.redirect('/login');
	}
});



module.exports = router;
