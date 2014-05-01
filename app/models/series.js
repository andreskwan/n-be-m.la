var models = require('./models.js'),
	Schema = models.Schema;

var seriesSchema = Schema({
	titulo 		: 'string',
	temporadas  : Number,
	pais		: String,
	genero		: {type: String,
				   enum: ['Comedia','Sci-Fi','Action']}
});
//convertir el schema a un modelo

var Series = models.model('seriestv', seriesSchema);

module.exports = Series;