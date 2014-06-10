// MVC here we have the CONTROLLERS
//todo lo relacionado con la ruta home
//command.js base de los modulos
var _ = require('underscore');

//
var homeController = function (server, users) {
	
	var isLoggedIn = function (req, res, next) {
		// debugger;
		if(req.session.passport.user){
			res.redirect('/app');
			return;
		}
		next();
	};

	// console.log('homeController has beed loaded');
	var postLogIn = function (req, res){
		// debugger;
		users.push(req.body.username);
		req.session.user = req.body.username

		//para comunicarme por sockets
		//notifica a todos en el server quien hizo log-in
		server.io.broadcast('log-in',{username : req.session.user});

		res.redirect('/app');
	};

	var getLogOut = function (req, res){
		debugger;
		//debo sacar el usuario del arreglo users
		//para comunicarme por sockets
		//notifica a todos en el server quien hizo log-out
		server.io.broadcast('log-out',{username : req.session.user});
		users = _.without(users, req.session.user);
		//debo destruir la sesion al usuario
		req.session.destroy();
		//sacarlo de la app y enviarlo al home del site
		res.redirect('/');
	};

	// mostrar mensaje desde el servidor
	var getHome = function (req, res) {
		// debugger;
		res.render('home');
		// console.log("app PATH: " + __dirname + '/app/views');
	};

	//to leave you should be inside
	//redirected to home if user is not loggedIn
	server.get('/', isLoggedIn, getHome);
	server.get('/log-out', getLogOut);
	server.post('/log-in', postLogIn);

	console.log('homeController has beed loaded');
};

//module nos permite acceder objetos de manera global(como el window)
module.exports = homeController;

