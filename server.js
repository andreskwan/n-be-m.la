var express = require('express.io'),
	swig = require('swig'),
	_ = require('underscore');
//server para passport
var	passport = require('passport');

var RedisStore = require('connect-redis')(express);

var server = express();
//para correr socket.io y express en el mismo puerto
//una linea majica
server.http().io();


var users = [];

server.engine('html',swig.renderFile);
server.set('view engine', 'html');
server.set('views','./app/views/');

// cargar archivos estaticos
server.use(express.static('./public'))

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

// Aqui van los Controllers
var homeController = require('./app/controllers/home.js');
var appController  = require('./app/controllers/app.js');

//Pasarles las variables que necesitan para funcionar correctamente
homeController(server,users);
appController(server,users);

// Connections
// tambien podrian ser para otros servicios como fb
var twitterConnection = require('./app/connections/twitter.js');

twitterConnection(server);


server.listen(3001);
console.log('Servidor corriendo en http://127.0.0.1:3001');
