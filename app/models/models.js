var mongoose = require('mongoose');

//donde esta mi base de datos
mongoose.connect('mongodb://localhost/' + 'backendPro');

module.exports = mongoose;
