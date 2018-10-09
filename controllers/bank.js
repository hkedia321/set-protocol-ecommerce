var express = require('express');
var router = express.Router();
const JSEncrypt = require('node-jsencrypt');
const jsEncrypt = new JSEncrypt();
var msg91 = require("msg91")("", "611332", "1" );// 1 - promotional route 
var nodemailer = require('nodemailer');
const keys = require('./keys-data');
var sess;
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: require('./email-credentials')
});

// grab the model
var Transaction = require('../models/transaction');

/* POST purchase submit */
router.get('/bank/verify', function(req, res, next) {
	var pimd = req.query.pimd;
	var phone = req.query.phone;
	console.log("5. bank received PIMD and verifies payment details");
	jsEncrypt.setPrivateKey(keys.bank.private);
	var decrypted = jsEncrypt.decrypt(pimd);
	decrypted = JSON.parse(decrypted);
	var otp = parseInt(Math.random()*10000);// 4 characters
	var transactionid = parseInt(Math.random()*1000000000);// 9 characters
	// saving in database
	var newData = Transaction({
		name: decrypted.name,
		creditcardno: decrypted.creditcardno,
		creditcarddate: decrypted.creditcarddate,
		cvv: decrypted.cvv,
		otp,
		transactionid
	});
	newData.save(function(err) {
		if (err) throw err;
	});
	// send OTP
	msg91.send(phone, "Thank you for using your credit card. Your OTP is " + otp + ". Please dont share OTP with others.", function(err, response){
	});
	console.log("6. bank successfully verifies payment information and sends OTP to user");
	// Verify from bank
	res.json({success:1, transactionid});
});

/* GET verification OTP */
router.get('/purchase-verification', function(req, res, next) {
	var phone = req.query.phone;
	var transactionid = req.query.transactionid;
	var email = req.query.email;
	sess = req.session;
	res.render('otpverification',{
		phone,
		otpStatus:false,
		username: sess.username, 
		name: sess.name, 
		transactionid,
		email
	});
});

/* POST verification OTP form submit */
router.post('/purchase-verification/submit', function(req, res, next) {
	var otp = req.body.otp;
	var phone = req.body.phone;
	var transactionid = req.body.transactionid;
	var email = req.body.email;
	sess = req.session;
	Transaction.find({ otp: otp,transactionid: transactionid }, function(err, user) {
		if (err) throw err;
		if (user.length > 0) {
			// success purchase
			console.log("7. User submits correct OTP");
			var mailOptions = {
				from: 'geek.harshitkedia@gmail.com',
				to: email,
				subject: 'Successful purchase iphoneX!',
				text: `Dear ${sess.name}, \n Thank you for your purchase. Your payment has been successful. Your transaction id is ${transactionid}. This is a notice to pay your credit card bill soon.`
			};
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
				}
			});
			console.log("8. payment successful. User is sent confirmation mail");
			res.redirect('/order-successful?tid='+transactionid);
		}
		else {
			res.render('otpverification',{
				phone,
				otpStatus:"Incorrect OTP. Please try again",
				username: sess.username, 
				name: sess.name, 
				transactionid,
				email
			});
		}
	});
	
});

/* GET order-successful */
router.get('/order-successful', function(req, res, next) {
	var transactionid = req.query.tid;
	sess = req.session;
	res.render('ordersuccessful',{
		username: sess.username, 
		name: sess.name, 
		transactionid
	});
});

module.exports = router;
