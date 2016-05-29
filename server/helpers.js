'use strict';

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = require('./User.model.js');
var jwt = require('jwt-simple');
var https = require('https');
var Q = require("q");


module.exports.userSignup = function(username, password, res) {

	User.findOne({username: username}, function(err, user) {
		if(err) {
			console.error('error', err);
			res.status(500).send("Server error.")
		} else {
			//if user does not exists
			if(user === null) {
				var hash = bcrypt.hashSync(password);
				var user = new User({
					username: username,
					password: hash
				});

				user.save(function(err, user) {
					if(err) {
						console.error('error', err);
						res.status(500).send("Server error.")

					} else {
						createToken(res, user.id);
						//res.status(201).send("User added.");
					}
				})
			} else {
				res.status(409).send("User exists.");
			}

		}
	})
};

module.exports.userLogin = function(username, password, res) {

	User.findOne({username: username}, function(err, user) {
		if(err) {
			console.error('error', err);
			res.status(500).send("Server error.")
		}
		if(user) {
			//if user does exist
			bcrypt.compare(password, user.password, function(err, result) {
			  if (err) {
			    console.error(err);
			    res.status(500).send('Server error.');
			  }

			  if (result) {
			    // if password matches, log user in
			    createToken(res, user.id);
			  } else {
			    // Password mismatch
			    res.status(401).send("Wrong password.");
			  }
			});
		} else {
			//if user does not exist
			res.status(401).send("User does not exist.");
		}
	})
};

module.exports.getProfile = function(req, res) {

	var id = req.id;

	User.findOne({id: id}, function(err, user) {
		if(err) {
			console.error(err);
			res.status(500).send("server error.");
		}
		res.status(200).send(user);
	})
};

module.exports.postProfile = function(req, res) {

	var id = req.id;

	//find the user in database
	User.findById(id, function (err, user) {
		if (err) {
			res.status(500).send("Server error.")
		}
	 	user.name = req.body.name;
	  user.cuisine = req.body.cuisine;
	  user.locations = req.body.locations;

	  //get coordinates of all locations from google api
		var index = 0;
		promiseWhile(function () { return index < locations.length; }, function () {
			getCoordinates(locations[index].address)
			.then(function(res){
					user.locations[index].longitude = res.longitude;
					user.locations[index].latitude = res.latitude;
					index++;
				});
			return Q.delay(300); // arbitrary async
		}).then(function () {
			//save user to the database
			user.save(function (err) {
				if (err) {
					res.status(500).send("Server error about database.")
				} else {
					res.status(201).send(user);
				}
			});
		}).done();

	});
};

module.exports.editProfile = function(req, res) {

	var id = req.id;

	//find the user in database
	User.findOne({id: id}, function (err, user) {
		if (err) {
			res.status(500).send("Server error.")
		}
	 	user.name = req.body.name;
	  user.cuisine = req.body.cuisine;
	  user.locations = req.body.locations;
	  user.image = req.body.image;

		var index = 0;
		promiseWhile(function () { return index < user.locations.length; }, function () {
			getCoordinates(user.locations[index].address)
			.then(function(res){
					user.locations[index].longitude = res.longitude;
					user.locations[index].latitude = res.latitude;
					index++;
				});
			return Q.delay(400); // arbitrary async
		}).then(function () {
			//save user to the database
			user.save(function (err) {
				if (err) {
					res.status(500).send("Server error about database.")
				} else {
					res.status(201).send(user);
				}
			});
		}).done();

	});
}

module.exports.findTrucks = function(req, res) {

	var date = new Date();
	var day = date.getDay();
	var time = date.getHours();

	// var address = req.body.address;
	var longitude = req.body.longitude;
	var latitude = req.body.latitude;



	User.find({}, function(err, users) {
		if(err) {
			console.error('err', err);
		} else {
			var trucks = [];
			//looping through all the users
			for(var i = 0; i < users.length; i++) {
				//looping through all the locations of every user
				for(var j = 0; j < users[i].locations.length; j++) {
					//check if user is working today
					if(!users[i].locations[j].hours[day]) {
						continue;
					}

					
					//check if user is working within current hour
					if(users[i].locations[j].hours[day][0] !== null && users[i].locations[j].hours[day][0] <= time && users[i].locations[j].hours[day][1] >= time) {
						//get geolocation of the truck
						var thisLongitude = users[i].locations[j].longitude;
						var thisLatitude = users[i].locations[j].latitude;
						//calculate distance between user and this truck
						var distance = getDistance(latitude, longitude, thisLatitude, thisLongitude);
						//sending current address information to the client
						var copy = JSON.parse(JSON.stringify(users[i]));
						copy.currentAddress = users[i].locations[j].address;
						copy.currentLongitude = users[i].locations[j].longitude;
						copy.currentLatitude = users[i].locations[j].latitude;
						copy.distance = distance;
						trucks.push(copy);
					}
				}
			}
			res.status(201).send(trucks);
		}
	});
};

module.exports.findTruck = function(req, res) {
	var id = req.body.id;
	var longitude = req.body.longitude;
	var latitude = req.body.latitude;

	User.findOne({id: id}, function(err, user) {
		if(err) {
			console.error('err', err);
		} else {
			var date = new Date();
			var day = date.getDay();
			var time = date.getHours();

			for(var j = 0; j < user.locations.length; j++) {
				//check if user is working today
				if(!user.locations[j].hours[day]) {
					continue;
				}
				//check if user is working within current hour
				if(user.locations[j].hours[day][0] <= time && user.locations[j].hours[day][1] >= time) {
					//get geolocation of the truck
					var thisLongitude = user.locations[j].longitude;
					var thisLatitude = user.locations[j].latitude;
					//calculate distance between user and this truck
					var distance = getDistance(latitude, longitude, thisLatitude, thisLongitude);
					//sending current address information to the client
					var copy = JSON.parse(JSON.stringify(user));
					copy.currentAddress = user.locations[j].address;
					copy.currentLongitude = user.locations[j].longitude;
					copy.currentLatitude = user.locations[j].latitude;
					copy.distance = distance;
					copy.hour = [user.locations[j].hours[day][0], user.locations[j].hours[day][1]];
				}
			}
			res.status(201).send(copy);
		}
	});
};

var createToken = function(res, id) {

	var payload = {id: id};
	var secret = require('./config.js').tokenSecret;
	var token = jwt.encode(payload, secret);
	res.set('token', token).status(201).json({token: token});
};

var verifyToken = function(req, res, next) {

	var secret = require('./config.js').tokenSecret;
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	if(token) {
    	var decodedToken = jwt.decode(token, secret);
    	var id = decodedToken.id;
    	req.id = id;
    	next();
	} else {
		res.status(401).send("Not authorized.")
	}
};


var getDistance = function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p))/2;
    // returns distance in miles
    return Math.round(12742 * Math.asin(Math.sqrt(a))/1.60932*10)/10;
  }

var getCoordinates = function(address) {

	var APIkey = require('./config.js').googleAPIkey;
	var query = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address +"&key=" + APIkey;

	return new Promise(function(resolve, reject) {
		https.get(query, function(res) {
			var body = "";
			res.on('data', function(chunk) {
				body += chunk;
			});
			res.on('end', function(error) {
				if(error) {
					reject(error);
				} else {
					//get current address's longitude latitude
					var result = JSON.parse(body);
					var longitude = result.results[0].geometry.location.lng;
					var latitude = result.results[0].geometry.location.lat;
					resolve({longitude: longitude, latitude: latitude});
				}
			})
		})
	});
}

// `condition` is a function that returns a boolean
// `body` is a function that returns a promise
// returns a promise for the completion of the loop
var promiseWhile = function (condition, body) {
    var done = Q.defer();

    function loop() {
        // When the result of calling `condition` is no longer true, we are
        // done.
        if (!condition()) return done.resolve();
        // Use `when`, in case `body` does not return a promise.
        // When it completes loop again otherwise, if it fails, reject the
        // done promise
        Q.when(body(), loop, done.reject);
    }

    // Start running the loop in the next tick so that this function is
    // completely async. It would be unexpected if `body` was called
    // synchronously the first time.
    Q.nextTick(loop);

    // The promise
    return done.promise;
}


module.exports.createToken = createToken;
module.exports.promiseWhile = promiseWhile;
module.exports.verifyToken = verifyToken;
