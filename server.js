
// include the express module
var express = require('express');
//cant get this line to work
// var app = express.createServer();
var app =express();
app.get('/', function(req, res){
    res.send('Hello World');
});
app.listen(5000,listening);
function listening(){
	console.log("listening");
}