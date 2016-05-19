var express = require('express');
var router = require('express').Router();
var parser = require('body-parser');
var User = require('./User.model.js'); 
var helpers = require('./helpers.js');
var parser = require('body-parser');

router.use(parser.json());
router.use(parser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
var url = require('./config.js').url;
mongoose.connect(url);
var db = mongoose.connection;
//One Time Only, to import init data
// var saveInitData = require('./initData.js');
// saveInitData();

router.post('/signup', function(request, response) {

	var username = request.body.username;
	var password = request.body.password;
	//check if both username and password are filled in.
	if(username !== null && password !== null) {
		//if username exists in database
		helpers.userSignup(username, password,response);		
	} else {
		response.status(400).send("username and password have to be filled in.");
	}
});

router.post('/login', function(request, response) {
	console.log('got from client')
	var username = request.body.username;
	var password = request.body.password; 
	//check if both username and password are filled in.
	if(username !== null && password !== null) {
		//if username exists in database
		helpers.userLogin(username, password,response);		
	} else {
		response.status(400).send("Username and password have to be filled in.");
	}
});

router.get('/profile', helpers.verifyToken, function(request, response) {
	helpers.getProfile(request, response);
});

router.post('/profile', helpers.verifyToken, function(request, response) {
	//save updated data in database
	helpers.profile(request, response);
});

router.post('/editProfile', helpers.verifyToken, function(request, response) {
	helpers.editProfile(request, response);
})


router.post('/findTrucks', function(request, response) {

	helpers.findTrucks(request, response);
});

router.post('/findTruck', function(request, response) {
	helpers.findTruck(request, response);
});

router.get('/logout', function(request, response) {
  request.session.destroy(function(){
    response.sendStatus(200);
  });
});

router.get('*', function(request, response) {
	response.redirect('/');
});


module.exports = router;

