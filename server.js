var express = require('express');
var app = express();
var httpPort = process.env.PORT || 8080;
var httpPorts = process.env.PORT || 8081;
var http = require('http');
var https = require('https');
var fs = require('fs');

const options = {  
  key: fs.readFileSync('ssl.key'),
  cert: fs.readFileSync('ssl.crt'),
  requestCert:        true,
  rejectUnauthorized: false
};


//host static files
app.use(express.static(__dirname + '/client/'));

//connect to routes.js
var router = require('./server/routes.js');
app.use("/", router);


// app.listen(port, function(){
//   console.log('Listening on port ' + port);
// });

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);