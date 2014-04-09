var express = require('express.io'),
	swig = require('swig'),
	_ = require('underscore');

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
});

var isntLoggedIn = function (req, res, next) {
	// debugger;
	if(!req.session.user){
		res.redirect('/');
		return;
	}

	next();
};


var isLoggedIn = function (req, res, next) {
	// debugger;
	if(req.session.user){
		res.redirect('/app');
		return;
	}
	next();
};

// mostrar mensaje desde el servidor
server.get('/', isLoggedIn, function (req, res) {
	res.render('home');
	// console.log("app PATH: " + __dirname + '/app/views');
});

server.get('/app', isntLoggedIn, function (req, res) {
	// debugger;
	// res.render('app', {
	// 	user : req.session.user,
	// 	users : users
	// });
	res.render('app', {
		user : req.session.user,
		users : users 
	});
});

server.post('/log-in', function (req, res){
	users.push(req.body.username);


	req.session.user = req.body.username

	//para comunicarme por sockets
	//notifica a todos en el server quien hizo log-in
	server.io.broadcast('log-in',{username : req.session.user});

	res.redirect('/app');
});

server.get('/log-out', function (req, res){
	// debugger;
	//debo sacar el usuario del arreglo users
	//para comunicarme por sockets
	//notifica a todos en el server quien hizo log-out
	server.io.broadcast('log-out',{username : req.session.user});

	users = _.without(users, req.session.user);
	//debo destruir la sesion al usuario
	req.session.destroy();
	//sacarlo de la app y enviarlo al home del site
	res.redirect('/');
});

// nuevas rutas para socket.io
server.io.route('Hello', function(req){
	// debugger;
	req.io.emit('Saludo',{
		message: 'ServerReadyy'
	});
});

server.listen(3001);