var User    = require('../models/user.js');
var Post 	= require('../models/post.js');
var url     = require('url');
var request = require('request');
// todo lo relacionado con la ruta app
var appController = function (server,users) {


	options = {
		protocol: "https:",
		host: "api.twitter.com",
		pathname: '1.1/search/tweets.json',
		query: { q: "codeschool"}
	};

	var searchURL = url.format(options);


	var getUser = function (req,res, next){
		User.findOne({username:"andreskwan"}, 
			function(err, user){
				// debugger;  
				//user from db
				//assigned to req.user
				req.user = user;
				next();
			});
	};
	//middleware
	//called before to redirect to /app
	var isntLoggedIn = function (req, res, next) {
		// debugger;
		

		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	server.get('/app', isntLoggedIn, function (req, res) {
		//Post para mostrarle al usuario
		Post.find({}).exec(
			function (err, posts){
				debugger;
				res.render('app', {			
					//user es el objeto json o profile del usuario
					//no seria mejor que en app.js 
					//sacar al info a la db y luego pasarla al
					//browser
					//supongo que asi es mas rapido, por que 
					//no tiene que ir hasta el servidor para tomar acciones
					user  : req.session.passport.user,
					users : users, 
					posts : posts 
				});
		});
		// debugger;
		request(searchURL).pipe(res);

	});

	server.post('/app/create-post', isntLoggedIn, getUser, function (req, res){
		// debugger;
		
			var post = new Post({
				content : req.body.content,
				user    : req.user
			});			

		post.save(function(err){
			// debugger;
			if(err){
				res.send(500, err);
			}
			res.redirect('/app'); 
		});
	});

	console.log('appController has beed loaded');
};

module.exports = appController;