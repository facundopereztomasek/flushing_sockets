var screenHandler = require('./screenHandler');
var controlHandler = require('./controlHandler');

var protocol = function(io){

	// global.devices = {};
	// global.devices.screen = {};
	// global.devices.control = {};
	
	io.on('connection', function(socket){
    
    	console.log('Conexion entrante: ' + socket.handshake.address);

    	screenHandler( socket );
    	controlHandler( socket );

	});
};

module.exports = protocol;
