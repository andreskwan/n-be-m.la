//cargar modulo de modelos
//los modelos require dos cosas
//1 los modelos 
//2 los esquemas
var models = require('./models.js'),
	Schema = models.Schema;

var userSchema = Schema({
	username : 'string',
	twitter  : Schema.Types.Mixed
});
//convertir el schema a un modelo

var User = models.model('user', userSchema);

module.exports = User;