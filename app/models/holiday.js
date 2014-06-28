var models = require('./models.js'),
	Schema = models.Schema;

var holidaySchema = Schema({
	createdAt    : 			{ type: Date, default: Date.now },
	date	     : 			{ type: Date },
	details      : 		    { type: String, trim: true },
	image		 : 			{ data: Buffer, contentType: String },
	name         :          { type: String, trim: true },
	objectId     :          { type: String },
	observedBy   :     		{ type: Array },
	syncStatus   : 		    { type: Number },
	updatedAt    : 			{ type: Date },
	wikipediaLink:  		{ type: String, trim: true }
});
//convertir el schema a un modelo
//compiling our schema into a Model.
//A model is a class with which we construct documents
var Holidays = models.model('holiday', holidaySchema);

module.exports = Holidays;