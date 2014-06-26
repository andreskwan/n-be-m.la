var models = require('./models.js'),
	Schema = models.Schema;

var holidaySchema = Schema({
	name         :          { type: String, trim: true },
	observedBy   :     		{ type: Array },
	wikipediaLink:  		{ type: String, trim: true },
	details      : 		    { type: String, trim: true },
	date	     : 			{ type: Date, default: Date.now }
});
//convertir el schema a un modelo
//compiling our schema into a Model.
//A model is a class with which we construct documents
var Holidays = models.model('holiday', holidaySchema);

module.exports = Holidays;