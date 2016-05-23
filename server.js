var express = require('express');
var app = express();
var port = process.env.PORT || 8080;


//host static files
app.use(express.static(__dirname + '/client/'));

//connect to routes.js
var router = require('./server/routes.js');
app.use("/", router);


app.listen(port, function(){
  console.log('Listening on port ' + port);
});