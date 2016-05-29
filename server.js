var express = require('express');
var app = express();

var httpPort = process.env.PORT || 3000;
var http = require('http');

//host static files
app.use(express.static(__dirname + '/client/'));

//connect to routes.js
var router = require('./server/routes.js');
app.use("/", router);


http.createServer(app).listen(httpPort);