var express = require('express');
var router = require('express').Router();
var User = require('./User.model.js'); 
var helpers = require('./helpers.js');
//body-parse middleware
var parser = require('body-parser');
router.use(parser.json());
router.use(parser.urlencoded({ extended: true }));

//One Time Only, to import init data
// var saveInitData = require('./initData.js');
// saveInitData();




router.post('/signup', function(req, res) {

	var username = req.body.username;
	var password = req.body.password;
	//check if both username and password are filled in.
	if(username !== null && password !== null) {
		//if username exists in database
		helpers.userSignup(username, password, res);		
	} else {
		res.status(400).send("username and password have to be filled in.");
	}
});

router.post('/login', function(req, res) {

	var username = req.body.username;
	var password = req.body.password; 
	//check if both username and password are filled in.
	if(username !== null && password !== null) {
		helpers.userLogin(username, password,res);		
	} else {
		res.status(400).send("Username and password have to be filled in.");
	}
});

router.get('/profile', helpers.verifyToken, helpers.getProfile);

router.post('/profile', helpers.verifyToken, helpers.postProfile);

router.post('/editProfile', helpers.verifyToken, helpers.editProfile);

router.post('/findTrucks', helpers.findTrucks);

router.post('/findTruck', helpers.findTruck);

router.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.sendStatus(200);
  });
});

router.get('*', function(req, res) {
	res.redirect('/');
});

module.exports = router;

