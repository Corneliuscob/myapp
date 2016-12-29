
// include the http module
var http = require('http');

// create a webserver
http.createServer(function (req, res) {

    // respond to any incoming http request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');

}).listen(1337, '127.0.0.1');
// include the express module
var express = require('express');
//cant get this line to work
// var app = express.createServer();
var app =express();
app.get('/', function(req, res){
    res.send('Hello World');
});
app.listen(1337,listening);
function listening(){
	console.log("listening");
}