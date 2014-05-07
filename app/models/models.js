var mongoose = require('mongoose');

//donde esta mi base de datos
mongoose.connect('mongodb://localhost/' + 'backendPro',
	//callback to handle errors
	function(err,res){
		if(err){
			console.log('Error: Conectando a la db: '+ err);
		}else{
			console.log('OK!: Coneccion a la db. Exitosa!');
		}
	});

module.exports = mongoose;
