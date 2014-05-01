var SerieController = function (server) {
	var SeriesTVmodel = require('../models/series.js');
	
	//Create POST an obj
	addSerie = function(req,res) {
		console.log('POST');
		console.log(req.body);
		var serieTvObj = new SeriesTVmodel({
			titulo		: req.body.titulo,
			temporadas  : req.body.temporadas,
			pais		: req.body.pais,
			genero		: req.body.genero
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
				serieTvObj.titulo	    = req.body.titulo,
				serieTvObj.temporadas   = req.body.temporadas,
				serieTvObj.pais	    	= req.body.pais,
				serieTvObj.genero		= req.body.genero
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

	// api routes
	server.get('/seriestv',        findAllSeries);
	server.get('/seriestv/:id',    findSerieById);
	server.post('/seriestv',       addSerie);
	server.put('/seriestv/:id',    updateSerie);
	server.delete('/seriestv/:id', deleteSerie); 

	console.log('SerieController has beed loaded');
};



module.exports = SerieController;

// CRUD
// Create
// Read
// Update
// Delete