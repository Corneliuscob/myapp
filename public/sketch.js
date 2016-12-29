//loading p5 js
var canvas_height = 400;
var canvas_width = 400;
function setup() {
	createCanvas(canvas_width,canvas_height);
	loadJSON('all', gotData);
	console.log("wordbase located");
		// p5 allows us to select buttons kinda like a jquery
	var button = select('#submit');
	button.mousePressed(submitWord);

	

}


function gotData(data){
 console.log(data);
 var keys = Object.keys(data);
 console.log(keys);
 background(51);
 for (var i = 0; i < keys.length; i ++)
	{
		var text_size_key = 16;
		
		var word =  keys[i];
		var score =  data[word];
		textSize(text_size_key);
		do var x = random (width);
		while ( x+ textWidth(word)>canvas_width);

		do var y = random (height);
		while (y > canvas_height-ceil(text_size_key/2) || y < 0 + ceil(text_size_key/2));
		fill(255);
		text(word,x,y);
		console.log(word+": "+"x: "+x+"y: "+y);

	}
}
function drawData ( ){
		loadJSON('all',gotData);
	}

function submitWord(){
		 var word = select('#word').value();
		 var score = select('#score').value();
		 console.log(word,score);

		 loadJSON('add/'+word+'/'+score, finish);
		 


	}
function finish (){
		 	console.log("finished");
		 	drawData();
		 }