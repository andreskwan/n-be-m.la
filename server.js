var express = require('express'),
	swig    = require('swig');

var session = require('express-session')
, RedisStore = require('connect-redis')(session);

// var RedisStore = require('connect-redis')(express);

var server = express();




//////////////////////////////////
// Configuracion del server
//////////////////////////////////
server.configure(function (){
	//log para ver lo que pasa en el servidor
	server.use(express.logger());

	//body parser 
	server.use(express.cookieParser());
	
	//cockie parser
	server.use(express.bodyParser());

	//configurando sessiones en express
	server.use(express.session({
		//para evitar que se roben mis sesiones
		secret : "locatz",
		store  : new RedisStore({})
		// si se desea configurar con un usuario
		// configuracion de redis to go
		// store  : new RedisStore({
		// host : conf.redis.host,
		// port : conf.redis.port, 
		// user : conf.redis.user,
		// pass : conf.redis.pass
		// 	});

	}));
});

//////////////////////////////////
// Configuracion de render para vistas
//////////////////////////////////
//1 motor de vistas
server.engine('html', swig.renderFile);
//2 tipo de motor, html
server.set('view engine', 'html');
//3 donde estaran las vistas
server.set('views', __dirname + '/app/views');

//////////////////////////////////
// URL's o Rutas para express
//////////////////////////////////

// mostrar mensaje desde el servidor
server.get('/', function (req, res) {
	res.render('home');
	console.log("app PATH: " + __dirname + '/app/views');
});

server.get('/app', function (req, res) {
	res.render('app', {user : req.session.user});
	console.log("app PATH: " + __dirname + '/app/views');
});

server.post('/log-in', function (req, res){
	req.session.user = req.body.username

	res.redirect('/app');
});

server.listen(3000);
