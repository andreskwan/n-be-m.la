//server - routes - HTTP TCP - socket.io
var express = require('express.io');
//http templates
var swig = require('swig');
//js array manipulation easy
var	_ = require('underscore');
//port number
var serverPort = 3001;

//authentication 
var	passport = require('passport');

//db for users authenticated
var RedisStore = require('connect-redis')(express);

//create the server
var server = express();

//associate the server with the port number
server.set('port', process.env.PORT || serverPort);

//para correr socket.io y express en el mismo puerto
//una linea majica
server.http().io();

var users = [];

server.engine('html',swig.renderFile);
server.set('view engine', 'html');
server.set('views','./app/views/');


// cargar archivos estaticos
//Using the static handler, 
// anything in /public can now be accessed by name.
server.use(express.static('./public'))
//an alternative 
//advantage - better path management
//static files also with require('path')
//server.use(express.static(path.join(__dirname, 'public')));

server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());

	server.use(express.session({ 
		secret : "lolcatz",
		store  : new RedisStore({})
		// store  : new RedisStore({
		//	host : conf.redis.host,
		//	port : conf.redis.port,
		//	user : conf.redis.user,
		//	pass : conf.redis.pass
		// });	
	}));

	//middlewares de passport
	server.use(passport.initialize());
	//sesiones para passport
	//rq.session.passport
	server.use(passport.session());
});

//funciones para serializar y deserializar usuarios
passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

/////////////////////////////////////
// Controllers
// Aqui van los Controllers
var homeController = require('./app/controllers/home.js');
var appController  = require('./app/controllers/app.js');

//Pasarles las variables que necesitan para funcionar correctamente
homeController(server,users);
appController(server,users);

/////////////////////////////////////
// Connections
// tambien podrian ser para otros servicios como fb
var twitterConnection = require('./app/connections/twitter.js');
twitterConnection(server);

//catch-all route to display a 404 page 
// when the requested content can’t be found.
server.use(function (req,res) {
    res.render('404', {url:req.url});
});

server.listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});
// console.log('Servidor corriendo en http://127.0.0.1:3001');
