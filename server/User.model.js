'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var url = require('./config.js').url;
mongoose.connect(url);
var db = mongoose.connection;

autoIncrement.initialize(db);


var LocationSchema = new Schema();
LocationSchema.add({
	address: String,
	longitude: Number,
	latitude: Number,
	hours: {} //hours:[{Mon: [8, 17]}] 
});

var UserSchema = new Schema({
	name: String,
	username: String,
	password: String,
	image: String,
	cuisine: String,
	locations: [LocationSchema] 
});


UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 100,
    incrementBy: 1
});

module.exports = mongoose.model('User', UserSchema);