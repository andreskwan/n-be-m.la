var passport        = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;
var User            = require('../models/user.js');
var fs 				= require('fs');
var path			= require('path');

var settings = JSON.parse(
				fs.readFileSync(
					path.resolve(__dirname,'../../apikey.json'),'utf8'));

var twitterConnection = function (server) {
	console.log('twitterConnection ready');

	passport.use(
		//strategy for connection
		new TwitterStrategy(
		{
			consumerKey:    settings.consumerKey,
			consumerSecret: settings.consumerSecret,
			callbackURL:    settings.callbackURL

		}, 
		function (token, tokenSecret, profile, done){
		    // debugger;
		    
			var user = new User(
			{
					username  : profile.username,
					twitter   : profile,
					image_url : profile.photos[0].value

			}
			);

			//guardar en la db
			user.save(function (err){
				// debugger;
				if(err){
					done(err, null);
					return;
				}
			});

			// var jsonTw = profile;
		    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		    // console.log("from db:" + profile.photos[0].value);
		    console.log("from db:" + user.get('image_url'));
		    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			//guardar el perfil con la sesion
			done(null, profile);

		}
	));

	//go to twitter and authenticate
	server.get('/auth/twitter', 
		passport.authenticate('twitter'));

	//when authenticated come back (callback)
	server.get('/auth/twitter/callback', 
		passport.authenticate('twitter', 
			{failureRedirect: '/'}), 
				function(req, res){
					res.redirect('/app');
				}
	);
};

module.exports = twitterConnection;
