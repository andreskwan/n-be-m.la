var express = require('express');
var server = express();

// arreglo de mensajes

var mensajes = [];
var responses = [];

//////////////////////////////////
// URL's o Rutas para express
//////////////////////////////////

// mostrar mensaje desde el servidor
server.get('/', function (req, res) {
	res.send('hello world');
});

server.get('/mensajes', function (req, res) {
	// res.send(mensajes + '<script>setTimeout(function(){window.location.reload},100)	</script>');
	
	// solo enviar cuando se tengan, no cada X tiempo
	//almacenando los mensajes
	responses.push(res);
});

// // enviar mensaje al servidor
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



// //Configuracion para render el sistema de vistas
// server.engine('html', swig.renderFile);
// //tipo del engine
// server.set('view engine', 'html');
// //donde estaran las vistas
// server.set('views', './aap/views');

// //rutas o url '/'
// server.get('/',function (req, res){
// 	// res.send('hello node');
// 	res.render('home');
// });

// server.get('/supervisor', function (req, res){
// 	res.send('supervisor es muy chevere')
// })

server.listen(3000);
