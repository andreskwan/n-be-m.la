var HolidayController = function (server) {
	var HolidaysModel = require('../models/holiday.js');
	
	//Create POST an obj
	postHoliday = function(req,res) {
		console.log('POST');
		console.log(req.body);
		var holidayObj = new HolidaysModel({
			name         :     req.body.name,
			observedBy   :     req.body.observedBy,
			wikipediaLink:     req.body.wikipediaLink,
			details      :     req.body.details,
			date         :     req.body.date
		});

		//db save 
		holidayObj.save(function(err){
			if(!err) console.log('Holiday saved');
			else console.log('Error:'+err);
		});
		res.send(holidayObj);
	};


	//Read GET an obj from the model
	getAllHolidays = function(req, res){
		HolidaysModel.find(function(err, holidays){
			if(!err) res.send(holidays);
			else console.log('Error:'+err);
		});
	};

	getHolidayById = function(req, res){
		HolidaysModel.findById(req.params.id, function(err, holidays){
			if(!err){
				res.send(holidays);
				console.log('Holiday found with ID: '+ req.params.id);
			}else{
				console.log('Error:'+err);	
			} 
		});
	};

	//Update PUT an obj
	putHoliday = function(req,res) {
		HolidaysModel.findById(req.params.id, function(err, holidayObj){
			if(!err){
				// res.send(holidayObj);
				holidayObj.name          = req.body.name;
				holidayObj.observedBy    = req.body.observedBy;
				holidayObj.wikipediaLink = req.body.wikipediaLink;
				holidayObj.details       = req.body.details;
				holidayObj.date          = req.body.date;
			}else{
				console.log('Can\'t find holiday Error:' + err);
			};

			//db save 
			holidayObj.save(function(err){
				if(!err) console.log('Holiday updated');
				else console.log('Can\'t Update Error:' + err);
			});
		});

		
		// res.send(serieTv);
	};

	//DELETE an obj
	deleteHoliday = function(req, res){
		HolidaysModel.findById(req.params.id, function(err, holidayObj){
			holidayObj.remove(function(err){
				if(!err) console.log('Holiday deleted!');
				else console.log('ERROR: '+ err);
			});
		});
	};

	//great way to organize methods according to APIRest
	// api routes
	server.get('/holidays',        getAllHolidays);
	server.get('/holidays/:id',    getHolidayById);
	server.post('/holidays',       postHoliday);
	server.put('/holidays/:id',    putHoliday);
	server.delete('/holidays/:id', deleteHoliday); 

	console.log('Holiday controller has beed loaded');
};



module.exports = HolidayController;

// CRUD
// Create
// Read
// Update
// Delete