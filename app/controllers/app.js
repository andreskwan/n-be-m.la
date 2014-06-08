var User    = require('../models/user.js');
var Post 	= require('../models/post.js');
var url     = require('url');
var request = require('request');
var _       = require('underscore');
// todo lo relacionado con la ruta app
var appController = function (server,users) {

	// options = {
	// 	protocol: "https:",
	// 	host: "api.twitter.com",
	// 	pathname: '1.1/search/tweets.json',
	// 	query: { q: "codeschool"}
	// };

	// var searchURL = url.format(options);

	//middleware
	//to obtain the user in the db 
	var getUser = function (req,res, next){
		User.findOne({username:req.session.passport.user.username}, 
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

	

	var getPosts = function (req, res) {
		//Post para mostrarle al usuario
		//pupulate brings all the user document from the db
		//I guest this could be inproved, what happen if there
		//are many people in the chat or in many rooms?
		//Just find the user post inside a room
		//and the other post of other people inside the same room
		Post.find({})
		.populate('user')
		.exec(
			function (err, posts){
				//to convert all post to JSON
				//by using map, is not the same  
				var postsAsJsonUS = _.map(posts, function(post){
					return post.toJSON();
				});
				var postsAsJsonJS = posts.map(function(post){
					return post.toJSON();
				});
				var objToRender = {			
					//user es el objeto json o profile del usuario
					//no seria mejor que en app.js 
					//sacar al info a la db y luego pasarla al
					//browser
					//supongo que asi es mas rapido, por que 
					//no tiene que ir hasta el servidor para tomar acciones
					// nota  : "de Andres con Amor",
					user  : req.session.passport.user,
					// users : users, 
					//I should send JSON to the views
					posts : postsAsJsonJS
				};
				//
				//write all posts to the app page
				res.render('app', objToRender);
				// debugger;
		});
		// debugger;
		// request(searchURL).pipe(res);
	};

	//POST 
	//from the form of post in app
	var createPost =  function (req, res){	
		//creates a post with JSON format	
		var post = new Post({
			content : req.body.content,
			user    : req.user
		});			
		//save the post in the db in the server
		post.save(function(err){
			// debugger;
			if(err){
				res.send(500, err);
			}
			var userObj =  req.user.toJSON();
			// debugger;

			//to add socket io functionality
			//this is broadcast to all sockets open (client side)
			//what about rooms?
			//- how to distinguish them 
			server.io.broadcast('post',
				{content : post.content,
					user : userObj.username
				});
			res.redirect('/app'); 
		});
	};

	server.post('/app/create-post', isntLoggedIn, getUser, createPost);
	server.get('/app', isntLoggedIn, getPosts);

	console.log('appController has beed loaded');
};

module.exports = appController;