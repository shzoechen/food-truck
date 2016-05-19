//sample data

var helpers = require('./helpers');
var User = require('./User.model.js');
var Q = require("q");


var initData = [
	{
	 "name": "Cheesy Bizness",
	 "username": "cheesy",
	 "password": "$2a$10$fPKoOpZhjHw1snXUGorn0ORa.rBTswXBoIba25G9DeAF3Wx/h3sD6",
	 "image": "http://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/25/2013/12/foodtruck.jpeg",
	 "cuisine": "Mediterranean",
	 "locations":[
	     {
	     "latitude": 34.0196705,
     	 "longitude": -118.4802497,
	     "address": "1408 Olympic Blvd Santa Monica, CA 90404",
	     "hours":{
	         "1": [8,22],
	         "4": [6,23]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "2":[11,20]
	         }
	     }
	 ]
	},
	{
	 "name": "Namaste Cafe",
	 "username": "namaste",
	 "password": "namaste",
	 "image": "http://www.gainesvillegrub.com/wp-content/uploads/2015/04/West-Side-Food-Trucks_Full_20008.jpg",
	 "cuisine": "French",
	 "locations":[
	     {
	     	"latitude": 34.0019939,
	     	"longitude": -118.4838825,
	     "address": "2612 Main St Santa Monica, CA 90405",
	     "hours":{
	         "1": [8,22]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "3":[9,20],
	         "0": [6,23]
	         }
	     }
	 ]
	},
	{
	 "name": "Calbi Truck",
	 "username": "calbi",
	 "password": "$2a$10$jYcHY/p4pd2hqTY/C4bY9eR9ohuZdG7fM980eYwVVcDb28Q.b4V4K",
	 "image": "http://www.adweek.com/files/imagecache/node-detail/news_article/fea-food-truck-hed-2012.jpg",
	 "cuisine": "Thai",
	 "locations":[
	     {
	     	"latitude": 34.0002554,
	     	"longitude": -118.4821436,
	     "address": "2728 Main St Santa Monica, CA 90405",
	     "hours":{
	         "1": [10,22],
	         "0": [10,23]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "2":[11,20]
	         }
	     }
	 ]
	},
	{
	 "name": "Tender Grill Gourmet Brazilian Kitchen",
	 "username": "tender",
	 "password": "tender",
	 "image": "http://www.tendergrillkitchen.com/TenderGrill/Home_files/Final.png",
	 "cuisine": "Brazilian",
	 "locations":[
	     {
	     "latitude": 33.990401,
     	 "longitude": -118.464175,
	     "address": "1515 Abbot Kinney Blvd, Venice, CA 90291",
	     "hours":{
	         "1": [9,19]
	         }
	     },
	     {
	     	"latitude": 34.057932,
	     	"longitude": -118.445326,
	     "address": "1220 Midvale Ave, Los Angeles, CA 90024",
	     "hours": {
	         "2":[9,20]
	         }
	     }
	 ]
	},
	{
	 "name": "Komodo",
	 "username": "komodo",
	 "password": "komodo",
	 "image": "http://roaminghunger.com/blog/wp-content/uploads/2011/03/komodo-e1423062384105.jpg",
	 "cuisine": "Asian Fusion",
	 "locations":[
	     {
	     "latitude": 34.029768,
     	 "longitude": -118.470261,
	     "address": "26th St & Pennsylvania Ave, Santa Monica, CA 90404",
	     "hours":{
	         "1": [10,19]
	         }
	     },
	     {
	     	"latitude": 34.046976,
	     	"longitude": -118.336806,
	     "address": "Wilshire Boulevard & San Vicente Boulevard, Los Angeles, CA 90025",
	     "hours": {
	         "2":[11,20],
	         "0": [6,23]
	         }
	     }
	 ]
	},
	{
	 "name": "Guerilla Tacos",
	 "username": "guerila",
	 "password": "guerilla",
	 "image": "http://nebula.wsimg.com/934b1319a04fb528ccbc823412bcd77f?AccessKeyId=FAC99C1D8EB857E051EF&disposition=0&alloworigin=1",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.016643,
     	 "longitude": -118.500960,
	     "address": "1221 Ocean Ave, Santa Monica, CA 90401",
	     "hours":{
	         "1": [8,20]
	         }
	     },
	     {
	     	"latitude": 34.017298,
	     	"longitude": -118.488386,
	     "address": "1547 Lincoln Blvd, Santa Monica, CA 90401",
	     "hours": {
	         "3":[10,18]
	         }
	     }
	 ]
	},
	{
	 "name": "South Philly Experience",
	 "username": "south",
	 "password": "south",
	 "image": "https://pbs.twimg.com/profile_images/420728058543239168/2lPoXWsD_400x400.jpeg",
	 "cuisine": "American",
	 "locations":[
	     {
	     "latitude": 34.020585,
     	 "longitude": -118.452993,
	     "address": "Ocean Park Blvd & 31st St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [10,18]
	         }
	     },
	     {
	     	"latitude": 34.016903,
	     	"longitude": -118.494099,
	     "address": "1410 5th St, Santa Monica, CA 90401",
	     "hours": {
	         "2":[9,20]
	         }
	     }
	 ]
	},
	{
	 "name": "505 Food Truck LA",
	 "username": "505",
	 "password": "505",
	 "image": "http://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/25/2013/12/foodtruck.jpeg",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.044005,
     	 "longitude": -118.468180,
	     "address": "12121 Wilshire Blvd, Los Angeles, CA 90025",
	     "hours":{
	         "1": [10,17]
	         }
	     },
	     {
	     	"latitude": 34.017298,
	     	"longitude": -118.501701,
	     "address": "1163 Ocean Ave, Santa Monica, CA 90401",
	     "hours": {
	         "2":[8,18]
	         }
	     }
	 ]
	},
	{
	 "name": "Holy Aioli Truck",
	 "username": "holy",
	 "password": "holy",
	 "image": "https://pbs.twimg.com/profile_images/378800000488058840/0d16e013b0a95aec284068fccf404f2e_400x400.jpeg",
	 "cuisine": "Kosher",
	 "locations":[
	     {
	     "latitude": 34.022520,
     	 "longitude": -118.507700,
	     "address": "757 Ocean Ave, Santa Monica, CA 90402",
	     "hours":{
	         "1": [6,18]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "2":[11,20]
	         }
	     }
	 ]
	},
	{
	 "name": "Richeeze",
	 "username": "richeeze",
	 "password": "richeeze",
	 "image": "https://pbs.twimg.com/profile_images/572576081295572992/4dlHHavf.png",
	 "cuisine": "American",
	 "locations":[
	     {
	     "latitude": 34.018366,
     	 "longitude": -118.486679,
	     "address": "929 Colorado Ave, Santa Monica, CA 90401",
	     "hours":{
	         "1": [10,20]
	         }
	     },
	     {
	     	"latitude": 34.007844,
	     	"longitude": -118.490630,
	     "address": "1819 Ocean Ave, Santa Monica, CA 90401",
	     "hours": {
	         "3":[10,19]
	         }
	     }
	 ]
	},
	{
	 "name": "The Beignet Truck",
	 "username": "beignet",
	 "password": "beignet",
	 "image": "http://thebeignettruck.com/wp-content/uploads/2014/12/The-Beignet-Truck_logo_large-1030x392.png",
	 "cuisine": "French",
	 "locations":[
	     {
	     "latitude": 34.010671,
     	 "longitude": -118.470555,
	     "address": "2520 14th St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [7,17]
	         }
	     },
	     {
	     	"latitude": 34.003046,
	     	"longitude": -118.484579,
	     "address": "2507 Main St, Santa Monica, CA 90405",
	     "hours": {
	         "2":[8,17]
	         }
	     }
	 ]
	},
	{
	 "name": "Roll n Lobster",
	 "username": "roll",
	 "password": "roll",
	 "image": "http://www.rollnlobster.com/images/rolln-lobster-logo.png",
	 "cuisine": "American",
	 "locations":[
	     {
	     "latitude": 34.002317,
     	 "longitude": -118.483915,
	     "address": "Ocean Park Blvd & Main St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [8,18]
	         }
	     },
	     {
	     	"latitude": 34.017845,
	     	"longitude": -118.501496,
	     "address": "101 Wilshire Blvc, Santa Monica, CA 90403",
	     "hours": {
	         "3":[8,20],
	         "0": [6,23]
	         }
	     }
	 ]
	},
	{
	 "name": "Gracias Senor",
	 "username": "gracias",
	 "password": "gracias",
	 "image": "https://pbs.twimg.com/profile_images/530135965654728704/gUxufZYO_400x400.jpeg",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.045006,
     	 "longitude": -118.524123,
	     "address": "15120 W Sunset Blvd, Pacific Palisades, CA 90272",
	     "hours":{
	         "1": [10,20]
	         }
	     },
	     {
	     	"latitude": 34.007036,
	     	"longitude": -118.488575,
	     "address": "2005 Main St, Santa Monica, CA 90405",
	     "hours": {
	         "2":[10,20]
	         }
	     }
	 ]
	},
	{
	 "name": "The Mighty Boba Truck",
	 "username": "mighty",
	 "password": "mighty",
	 "image": "http://www.summernet.com/images/summernet-portfolio/mighty-boba.jpg",
	 "cuisine": "Asian",
	 "locations":[
	     {
	     "latitude": 34.031391,
     	 "longitude": -118.459236,
	     "address": "Olympic Blvd & Centinela Ave, Santa Monica, CA 90404",
	     "hours":{
	         "1": [7,19],
	         "0": [10,23]
	         }
	     },
	     {
	     	"latitude": 34.012848,
	     	"longitude": -118.466553,
	     "address": "1711 Ocean Park Blvd, Santa Monica, CA 90405",
	     "hours": {
	         "3":[11,20]
	         }
	     }
	 ]
	},
	{
	 "name": "India Jones Chow Truck",
	 "username": "india",
	 "password": "india",
	 "image": "http://indiajoneschowtruck.com/site/wp-content/themes/indiajones/library/images/logo.png",
	 "cuisine": "Indian",
	 "locations":[
	     {
	     "latitude": 34.001994,
     	 "longitude": -118.483882,
	     "address": "2612 Main St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [9,19]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "2":[11,20]
	         }
	     }
	 ]
	},{
	 "name": "Border Grill Truck",
	 "username": "border",
	 "password": "border",
	 "image": "https://pbs.twimg.com/profile_images/1301670113/BG-Logo_400x400.jpg",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.053793,
     	 "longitude": -118.429971,
	     "address": "10635 Santa Monica Blvd Los Angeles, CA 90025",
	     "hours":{
	         "1": [10,20]
	         }
	     },
	     {
	     	"latitude": 34.031865,
	     	"longitude": -118.483218,
	     "address": "2001 Wilshire Blvd, Santa Monica, CA 90403",
	     "hours": {
	         "3":[11,19]
	         }
	     }
	 ]
	},
	{
	 "name": "The Garbage Truck",
	 "username": "garbage",
	 "password": "garbage",
	 "image": "https://pbs.twimg.com/profile_images/519966990849814528/FzC2o25d_400x400.jpeg",
	 "cuisine": "American",
	 "locations":[
	     {
	     "latitude": 34.000669,
     	 "longitude": -118.482582,
	     "address": "2708 Main St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [8,18]
	         }
	     },
	     {
	     	"latitude": 34.0300029,
	     	"longitude": -118.4689268,
	     "address": "2700 Pennsylvania Ave Santa Monica, CA 90404",
	     "hours": {
	         "2":[11,20]
	         }
	     }
	 ]
	},
	{
	 "name": "Bool Bbq",
	 "username": "bool",
	 "password": "bool",
	 "image": "http://static1.squarespace.com/static/535d8ce3e4b0140e2645801d/t/53828f14e4b036bf39f308e1/1414374580584/?format=750w",
	 "cuisine": "Asian-American Fusion",
	 "locations":[
	     {
	     "latitude": 34.021751,
     	 "longitude": -118.453964,
	     "address": " 31st St, Santa Monica, CA 90405",
	     "hours":{
	         "1": [8,16]
	         }
	     },
	     {
	     	"latitude": 34.101163,
	     	"longitude": -118.343716,
	     "address": "7060 Hollywood Blvd, Los Angeles, CA 90028",
	     "hours": {
	         "2":[8,16]
	         }
	     }
	 ]
	},
	{
	 "name": "El Paladar Oaxaqueno Taco Truck",
	 "username": "paladar",
	 "password": "paladar",
	 "image": "http://www.lataco.com/wp-content/uploads/paladar_oaxaqueno-600x4501.jpg",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.044132,
     	 "longitude": -118.455135,
	     "address": "11654 Santa Monica Blvd Los Angeles, CA 90025",
	     "hours":{
	         "1": [10,22]
	         }
	     },
	     {
	     	"latitude": 34.027529,
	     	"longitude": -118.488415,
	     "address": "1423 Wilshire Blvd, Santa Monica, CA 90403",
	     "hours": {
	         "2":[10,22],
	         "0": [10,23]
	         }
	     }
	 ]
	},
	{
	 "name": "G's Taco Spot",
	 "username": "spot",
	 "password": "spot",
	 "image": "http://roaminghunger.com/img/trucks/original/7033/53ea2017-7724-492c-9a9f-39ce46204482.jpg",
	 "cuisine": "Mexican",
	 "locations":[
	     {
	     "latitude": 34.138953,
     	 "longitude": -118.210849,
	     "address": "2006 Colorado Blvd, Los Angeles, CA 90041",
	     "hours":{
	         "1": [8,22]
	         }
	     },
	     {
	     	"latitude": 33.992751,
	     	"longitude": -118.454686,
	     "address": "920 S Venice Blvd Los Angeles, CA 90291",
	     "hours": {
	         "0":[0, 23]
	         }
	     }
	 ]
	}
];

var saveInitData = function() {


			var index = 0;
			helpers.promiseWhile(function () { return index < initData.length; }, function () {
				var user = new User(initData[index]);
				user.save(function(err, data) {
					if(err) console.log(err);
					else {
						console.log('success');
					}
				});
				index++;
				return Q.delay(300);
			}).done();
}


module.exports = saveInitData;