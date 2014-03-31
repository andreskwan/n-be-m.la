var express = require('express'),
	swig    = require('swig');

var server = express();

//////////////////////////////////
// Configuracion vistas
//////////////////////////////////
var mensajes  = [];
var responses = [];



//////////////////////////////////
// URL's o Rutas para express
//////////////////////////////////

// mostrar mensaje desde el servidor
server.get('/', function (req, res) {
	debugger;
	res.send('hello world');
});

// enviar mensaje al servidor
server.get('/mensajes/:mensaje', function (req, res) {
	//almacenando los mensajes
	mensajes.push(req.params.mensaje);

	// solo enviar cuando se tengan, no cada X tiempo
	responses.forEach(function(res){
		res.send(mensajes + '<script>window.location.reload()</script>')
	});
	//devolviento al browser el mensaje
	res.send('tu mensaje es ' + req.params.mensaje);
});

server.listen(3000);
