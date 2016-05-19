var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = require('./User.model.js');
var jwt = require('jwt-simple');
var https = require('https');
var Q = require("q");


module.exports.userSignup = function(username, password, response) {

	User.findOne({username: username}, function(err, user) {
		if(err) {
			console.error('error', err);
			response.status(500).send("Server error.")
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
						response.status(500).send("Server error.")

					} else {
						console.log("user is added.")
						createToken(response, user.id);
						//response.status(201).send("User added.");
					}
				})
			} else {
				response.status(409).send("User exists.");
			}

		}
	})

};

module.exports.userLogin = function(username, password, response) {

	User.findOne({username: username}, function(err, user) {
		if(err) {
			console.error('error', err);
			response.status(500).send("Server error.")
		} else {
			//if user does exist
			if(user) {
				//if password matches
				bcrypt.compare(password, user.password, function(err, result) {
				  if (err) {
				    console.error(err);
				    response.status(500).send('Server error.');
				  } else if (result) {
				    // Log user in
				    console.log('user.id', user.id)
				    createToken(response, user.id);
				  } else {
				    // Password mismatch
				    response.status(401).send("Wrong password.");
				  }
				});
			} else {
				response.status(401).send("User does not exist.");
			}
		}
	})
};

module.exports.getProfile = function(request, response) {
	var id = request.id;
	User.findById(id, function(err, user) {
		if(err) {
			response.status(500).send("server error.");
		} else {
			response.status(200).send(user);
		}
	})
};

module.exports.profile = function(request, response) {

	var id = request.id;

	//find the user in database
	User.findById(id, function (err, user) {
		if (err) {
			response.status(500).send("Server error.")
		} else {
		 	user.name = request.body.name;
		  user.cuisine = request.body.cuisine;
		  user.locations = request.body.locations;

			var index = 0;
			promiseWhile(function () { return index < locations.length; }, function () {
				sendRequest(locations[index].address)
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
						response.status(500).send("Server error about database.")
					} else {
						response.status(201).send(user);
					}
				});
			}).done();
		}

	});
};

module.exports.editProfile = function(request, response) {
	var id = request.id;

	//find the user in database
	User.findById(id, function (err, user) {
		if (err) {
			response.status(500).send("Server error.")
		} else {
		 	user.name = request.body.name;
		  user.cuisine = request.body.cuisine;
		  user.locations = request.body.locations;

			var index = 0;
			promiseWhile(function () { return index < user.locations.length; }, function () {
				sendRequest(user.locations[index].address)
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
						response.status(500).send("Server error about database.")
					} else {
						response.status(201).send(user);
					}
				});
			}).done();
		}

	});
}

module.exports.findTrucks = function(request, response) {
	var date = new Date();
	var day = date.getDay();
	var time = date.getHours();

	// var address = request.body.address;
	var longitude = request.body.longitude;
	var latitude = request.body.latitude;

//	sendRequest(address).then(function(res) {
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
						if(users[i].locations[j].hours[day][0] <= time && users[i].locations[j].hours[day][1] >= time) {
							//get geolocation of the truck
							thisLongitude = users[i].locations[j].longitude;
							thisLatitude = users[i].locations[j].latitude;
							//calculate distance between user and this truck
							var distance = getDistance(latitude, longitude, thisLatitude, thisLongitude);
							//sending current address information to the client
							var copy = JSON.parse(JSON.stringify(users[i]));
							copy.currentAddress = users[i].locations[j].address;
							copy.currentLongitude = users[i].locations[j].longitude;
							copy.currentLatitude = users[i].locations[j].latitude;
							copy.distance = distance;
							console.log("distance", copy.distance);
							trucks.push(copy);
						}
					}
				}
				response.status(201).send(trucks);
			}
		});
};

module.exports.findTruck = function(request, response) {
	console.log('findTruck')
	var name = request.body.name;
	User.findOne({name: name}, function(err, user) {
		if(err) {
			console.error('err', err);
		} else {
			console.log('find truck', user)
			response.status(201).send(user);
		}
	});
};

module.exports.createToken = createToken = function(response, id) {

	var payload = {id: id};
	var secret = require('./config.js').tokenSecret;
	var token = jwt.encode(payload, secret);
	console.log("in createToken")
	response.set('token', token).status(201).json({token: token});
};

module.exports.verifyToken = verifyToken = function(request, response, next) {

	var secret = "mksgreenfieldproject";
	var token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token'];
	if(token) {
		console.log('has token')
    	var decodedToken = jwt.decode(token, secret);
    	var id = decodedToken.id;
    	request.id = id;
    	next();
	} else {
		response.status(401).send("Not authorized.")
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

var sendRequest = function(address) {

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
					longitude = result.results[0].geometry.location.lng;
					latitude = result.results[0].geometry.location.lat;
					resolve({longitude: longitude, latitude: latitude});
				}
			})
		})
	});
}

// `condition` is a function that returns a boolean
// `body` is a function that returns a promise
// returns a promise for the completion of the loop
module.exports.promiseWhile = promiseWhile = function (condition, body) {
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

