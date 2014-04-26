// todo lo relacionado con la ruta app
var appController = function (server,users) {


	var isntLoggedIn = function (req, res, next) {
		// debugger;
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}

		next();
	};

	server.get('/app', isntLoggedIn, function (req, res) {
		// debugger;
		res.render('app', {			
			//user es el objeto json o profile del usuario
			//no seria mejor que en app.js 
			//sacar al info a la db y luego pasarla al
			//browser
			//supongo que asi es mas rapido, por que 
			//no tiene que ir hasta el servidor para tomar acciones
			user : req.session.passport.user,
			users : users 
		});
	});

	console.log('appController has beed loaded');
};

module.exports = appController;