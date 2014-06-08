var SerieController = function (server) {
	var SeriesTVmodel = require('../models/series.js');
	
	//Create POST an obj
	addSerie = function(req,res) {
		console.log('POST');
		console.log(req.body);
		var serieTvObj = new SeriesTVmodel({
			title:    req.body.title,
    		year:     req.body.year,
    		country:  req.body.country,
    		poster:   req.body.poster,
    		seasons:  req.body.seasons,
		    genre:    req.body.genre,
    		summary:  req.body.summary  
		});

		//db save 
		serieTvObj.save(function(err){
			if(!err) console.log('Serie de tv guardada');
			else console.log('Error:'+err);
		});
		res.send(serieTvObj);
	};


	//Read GET an obj from the model
	findAllSeries = function(req, res){
		SeriesTVmodel.find(function(err, series){
			if(!err) res.send(series);
			else console.log('Error:'+err);
		});
	};

	findSerieById = function(req, res){
		SeriesTVmodel.findById(req.params.id, function(err, series){
			if(!err){
				res.send(series);
				console.log('serie encontrada con ID: '+ req.params.id);
			}else{
				console.log('Error:'+err);	
			} 
		});
	};

	//Update PUT an obj
	updateSerie = function(req,res) {
		SeriesTVmodel.findById(req.params.id, function(err, serieTvObj){
			if(!err){
				// res.send(serieTvObj);
				serieTvObj.title   = req.body.title;
			    serieTvObj.year    = req.body.year;
			    serieTvObj.country = req.body.country;
			    serieTvObj.poster  = req.body.poster;
			    serieTvObj.seasons = req.body.seasons;
			    serieTvObj.genre   = req.body.genre;
			    serieTvObj.summary = req.body.summary;

			}else{
				console.log('Can\'t find serie Error:' + err);
			};

			//db save 
			serieTvObj.save(function(err){
				if(!err) console.log('Serie de tv actualizada');
				else console.log('Can\'t Update Error:' + err);
			});
		});

		
		// res.send(serieTv);
	};

	//DELETE an obj
	deleteSerie = function(req, res){
		SeriesTVmodel.findById(req.params.id, function(err, serieTvObj){
			serieTvObj.remove(function(err){
				if(!err) console.log('SerieTV Borrada!');
				else console.log('ERROR: '+ err);
			});
		});
	};

	//great way to organize methods according to APIRest
	// api routes
	server.get('/seriestv',        findAllSeries);
	server.get('/seriestv/:id',    findSerieById);
	server.post('/seriestv',       addSerie);
	server.put('/seriestv/:id',    updateSerie);
	server.delete('/seriestv/:id', deleteSerie); 

	console.log('Series controller has beed loaded');
};



module.exports = SerieController;

// CRUD
// Create
// Read
// Update
// Delete