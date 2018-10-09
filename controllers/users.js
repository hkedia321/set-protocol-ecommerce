var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;
var sess;
// grab the model
var User = require('../models/users');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/login');
});
router.get('/login', function(req, res, next) {
	sess = req.session;
	if (sess.username) {
		res.redirect('purchase');
	}
	else {
		res.render('login', {loginStatus: false});
	}
});
/* GET register page */
router.get('/register', function(req, res, next) {
	res.render('register', {loginStatus: false});
});
/* POST Login submit */
router.post('/login/submit', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	sess=req.session;
	User.find({ username: username }, function(err, user) {
		if (err) throw err;
		if (user.length > 0) {
			bcrypt.compare(password, user[0].password, function(err, resPas) {
				if (resPas == true) {
					sess.username = username;
					sess.name = user[0].name;
					console.log("1. successful login. User: " + username);
					res.redirect('http://localhost:4000/purchase');
				}
				else {
					res.render('login', { loginStatus: 'Incorrect Username / Password. Please try again'});
				}
			});
		}
		else {
			res.render('login', { loginStatus: 'Incorrect Username / Password. Please try again'});
		}
	});
	
});

/* POST Register submit */
router.post('/register/submit', function(req, res, next) {
	var username = req.body.username;
	var name = req.body.name;
	var password = req.body.password;
	bcrypt.hash(password, saltRounds, function(err, passwordHash) {
		var newData = User({
			username: username,
			name: name,
			password: passwordHash
		});
		newData.save(function(err) {
			if (err) throw err;
			console.log('User created!');
			sess.username = username;
			sess.name = name;
			res.redirect('/purchase');
		});
	});
});

/* GET logout */
router.get('/logout', function(req, res, next) {
	sess = req.session;
	sess.username = null;
	sess.name = null;
	res.redirect('/login');
});


module.exports = router;
