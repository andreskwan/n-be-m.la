//nunca cambiar en tiempo real

//cargar modulo de modelos
//los modelos require dos cosas
//1 los modelos 
//2 los esquemas
var models = require('./models.js'),
	Schema = models.Schema;

var userSchema = Schema({
	username  : 'string',
	twitter   : Schema.Types.Mixed,
	image_url : 'string' 
});


//convertir el schema a un modelo
//user - name of the model in the DB
//userSchema es la estructura que debe usar
var User = models.model('user', userSchema);

module.exports = User;

