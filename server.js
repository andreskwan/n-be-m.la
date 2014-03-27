var express = require('express');
var server = express();


//ruta o url '/'

server.get('/',function (req, res){
	res.send('hello node');
});

server.get('/supervisor', function (req, res){
	res.send('supervisor es muy chevere')
})

server.listen(3000);

