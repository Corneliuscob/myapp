var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// loading JSON file/s
var fs = require('fs');
var dataBase= fs.readFileSync('words.json');
//parsing database json 
var words =  JSON.parse(dataBase);

if (typeof(words)=== "object"){
console.log("words are loaded...");

}
else{
	console.log("error in loading the file...");
	console.log(typeof(words))
}

app.get('/all',showAll);
app.get('/search/:word',searchWord);
app.get('/add/:word/:score?',addWord);



//this function shows all words in the JSON object
function showAll(req, res){
	res.send(words);
}

//this function searches  for and returns the word aand score associated if a word is found 
function searchWord(req,res){
 	var data = req.params;
 	var searchTarget = data.word;
 	if (words[searchTarget])
 	{
 		var reply ={
 			Status:"found",
 			Score: words[searchTarget]
 			 		}
 	}
 	else{
 		reply = { status:"not found",
 					msg: "please search for another word"}
 	}
 	res.send(reply);	
}


//this function adds a new word to the database
function addWord(req,res){
  var data = req.params;
  var newWord = data.word;
  var wordScore =Number (data.score);
  var reply;
  if(!wordScore)
  {
  	reply = {
  		status:"No Score", msg: "Please enter an integer score"
  	}
  }
  else if(words[newWord]){
  	reply = {
  			Status: "Word already in list",
  			msg: " Please add a new word"
  	}
  	console.log("word already exists with a score; please add a new word");
  }

  else{
  	//this line writes the newWord and wordScore into the current js Object
  	words[newWord]= wordScore;
  	//this line actually writes to the JSON file to create persistence
  	//after parsing the JS Object
  	var parsedData = JSON.stringify(words,null,2);
  	fs.writeFile('words.json',parsedData,finshed);
	reply = { msg: "Your word was sucessufully added"}

  }
  	//this function with in the add function confirms the completion of adding a new word
  	function finshed(err){
  		console.log("the word was sucessfully added"+ data);
  	}
  	res.send(reply);
}