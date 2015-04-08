// CONTROL HANDLER CLIENTE

var socket = io();
socket.emit('CONTROL',null);
socket.on('SERVER_PING' , control_ping );

function control_ping( data ){
	console.log('SERVER: PING');
	socket.emit('CONTROL_PONG' , null );
}