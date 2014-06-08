//Client side JS
//Socket.io from client
//cargar DOM
$(document).ready(function (){
//conectarme al servidor
	window.io = io.connect(); 

	//cuando el cliente se connecte 
	//-este conectado 
	io.on('connect', function (socket){
		console.log('hi');
		// enviando mensajes al server
		io.emit('Hello');
	});

	//when we get data from the socket we add it directly
	//to the document
	//data has a property call message
	io.on('Saludo', function (data){
		// debugger;

		console.log(data);
	});

	io.on('log-in', function (data){
		// debugger;
		 $('#users').append('<li>'+data.username+'pepe </li>');
	});

	io.on('log-out', function (data){
		// debugger;
		$('#users li').each( function (i, item) {
			if(item.innerText === data.username){
				$(item).remove();
			}
		});
	});

	//////////////////////////////
	//from post
	//listener for event post from socket.io
	io.on('post', function (data){
		// debugger;
		$('#post').append('<p>'+ data.user +': '+data.content+'</p>');
	});


});