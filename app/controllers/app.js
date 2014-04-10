// todo lo relacionado con la ruta app
var appController = function (server,users) {

	
	var isntLoggedIn = function (req, res, next) {
	// debugger;
		if(!req.session.user){
			res.redirect('/');
			return;
		}

		next();
	};

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

	console.log('appController CACA has beed loaded');
};

module.exports = appController;