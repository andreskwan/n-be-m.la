var models = require('./models.js'),
	Schema = models.Schema;

var seriesSchema = Schema({
	title:    { type: String },
  	year:     { type: Number },
  	country:  { type: String },
  	poster:   { type: String },
  	seasons:  { type: Number },
  	genre:    { type: String, enum:
  				['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']},
  	summary:  { type: String }    
});
//convertir el schema a un modelo

var Series = models.model('seriestv', seriesSchema);

module.exports = Series;