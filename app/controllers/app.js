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
			user : req.session.passport.user,
			users : users 
		});
	});

	console.log('appController has beed loaded');
};

module.exports = appController;