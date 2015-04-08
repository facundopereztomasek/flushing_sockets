// CONTROL HANDLER SERVER

var controlHandler = function( socket ){

	// Asociacion de evento - handler(metodo)
	socket.on( 'CONTROL' , control_login );
	socket.on( 'CONTROL_PING' , control_ping );
	socket.on( 'CONTROL_PONG' , control_pong );
	
	// Handlers de los eventos
	function control_login( data ){
		global.DEVICES.control.socket = socket;
		global.DEVICES.control.address = socket.handshake.address;
		console.log( "Control entrante: " + socket.handshake.address );
		socket.emit('SERVER_PING' , null );
	}

	function control_ping( data ){
		socket.emit( 'PONG' , null );
		console.log( "Control: PING");
	}

	function control_pong( data ){
		console.log( "Control: PONG");
	}
};


module.exports = controlHandler;
