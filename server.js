var express = require('express'),
	swig = require('swig');

var RedisStore = require('connect-redis')(express);

var server = express();

var users = [];

server.engine('html',swig.renderFile);
server.set('view engine', 'html');
server.set('views','./app/views/');

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
	debugger;
	// res.render('app', {
	// 	user : req.session.user,
	// 	users : users
	// });
	res.render('app', {user : req.session.user });

});

// server.get('/app', isntLoggedIn(), function (req, res) {
// 	debugger;

// 	res.render('app', {user : req.session.user });
// 	// console.log("app PATH: " + __dirname + '/app/views');
// });

//////////////////////////////////
// Post Recibir info del usuario
// - toca definir el proceso de post
//   o el server no contesta nada
// - toca configurar al server para
//   que escuche los post
//////////////////////////////////

server.post('/log-in', function (req, res){
	req.session.user = req.body.username
	res.redirect('/app');
});

server.listen(3001);