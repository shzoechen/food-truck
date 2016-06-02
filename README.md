#Truhks 

* This is an app to find food truck nearby.
* It loads Santa Monica area by default, users can choose Los Angeles Area or by geolocation.
* Food Truck Owners can sign up, register for their food trucks' working hours at different locations.

#Getting Started

* Fork a copy of the repo. Clone it to your local machine.
* Next, you'll need to install the dependencies on your terminal:

```
$ npm install
```
```
$ bower install (cd into client folder)
```
* Also, you'll need to add files for API keys and configuration.

```
client/apiKey.js

var accessKeyId = 'AWS key';
var secretAccessKey = 'AWS key secret';

```
```
server/config.js

module.exports.googleAPIkey = "google map API key";
module.exports.tokenSecret = "set your own JWT secret";
module.exports.url = "mlab database url";
```
* To start the server and view the app on localhost:3000

```
$ node server.js
```

#Tech Stach
* AngularJS https://angularjs.org/
* NodeJS https://nodejs.org/
* ExpressJS http://expressjs.com/
* MongoDB https://www.mongodb.com/
* Mongoose http://mongoosejs.com/
* Amazon Web Service http://aws.amazon.com/
* Google Map API https://developers.google.com/maps/





