//cargar DOM
$(document).ready(function (){
//conectarme al servidor
	window.io = io.connect(); 

	//cuando este conectado 
	io.on('connect', function(socket){
		console.log('hi');
		// enviando mensajes al server
		io.emit('Hello');
	});

	//3142155097

	io.on('Saludo', function(data){
		// debugger;

		console.log(data);
	});

	io.on('log-in', function(data){
		// debugger;
		 $('#users').append('<li>'+data.username+'</li>');
	});
	io.on('log-out', function(data){
		// debugger;
		$('#users li').each( function (i, item) {
			if(item.innerText === data.username){
				$(item).remove();
			}
		});
	});
});