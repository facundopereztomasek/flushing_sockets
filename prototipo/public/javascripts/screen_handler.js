// SCREEN HANDLER CLIENTE

var socket = io();
socket.emit('SCREEN',null);
socket.on('SERVER_PING' , screen_ping );

function screen_ping( data ){
	console.log('SERVER: PING');
	socket.emit('SCREEN_PONG' , null );
}