var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema();

LocationSchema.add({
	address: String,
	longitude: Number,
	latitude: Number,
	hours: {}
});

var UserSchema = new Schema({
	name: String,
	username: String,
	password: String,
	image: String,
	cuisine: String,
	locations: [LocationSchema] //hours:[{Mon: [8, 17]}] 
});



module.exports = mongoose.model('User', UserSchema);