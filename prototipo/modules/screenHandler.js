// SCREEN HANDLER SERVER

var screenHandler = function( socket ){

	// Asociacion de evento - handler(metodo)
	socket.on( 'SCREEN' , screen_login );
	socket.on( 'SCREEN_PING' , screen_ping );
	socket.on( 'SCREEN_PONG' , screen_pong );
	
	// Handlers de los eventos
	function screen_login( data ){
		global.DEVICES.screen.socket = socket;
		global.DEVICES.screen.address = socket.handshake.address;
		console.log( "Screen entrante: " + socket.handshake.address );
		socket.emit('SERVER_PING' , null );
	}

	function screen_ping( data ){
		socket.emit( 'PONG' , null );
		console.log( "Screen: PING");
	}

	function screen_pong( data ){
		console.log( "Screen: PONG");
	}
};


module.exports = screenHandler;
