var passport = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;

var twitterConnection = function (server) {
	console.log('twitterConnection ready');

	passport.use(
		//strategy for connection
		new TwitterStrategy(
		{
			consumerKey: 'uAk79AhgznqNQRsl9XPMxZ548',
			consumerSecret: 'NsH5wxTLID3UVpw9KF9mqD2Wzz9wjBB5VoVCUgy114pMvL5QMa',
			callbackURL: 'http://127.0.0.1:3001/auth/twitter/callback'

		}, 
		function (token, tokenSecret, profile, done){
			// debugger;

			done(null, profile);

		}
	));

	server.get('/auth/twitter', passport.authenticate('twitter'));


	server.get('/auth/twitter/callback', 
		passport.authenticate('twitter', 
			{failureRedirect: '/'}), 
				function(req, res){
					res.redirect('/app');
				}
	);
};

module.exports = twitterConnection;