var express = require('express');
var app = express();

var message = 'Hello World, pepe Cortisona';


app.get('/timeout',function (req, res){
	//
	setTimeout(function (){ 
	res.send('Hello World');
	},3000);
});

app.get('/',function (req, res){
	res.send(message);	
});

var server = app.listen(3000, function() {
    console.log('Kwan listening on port %d', server.address().port);
});