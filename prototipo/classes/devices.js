// DEFINICION DE LA CLASE DISPOSITIVOS
var StringView = require('./stringview');
var Devices =  function(){
    this.screen = {
    	"address"			:"0.0.0.0",
    	"status"			:"offline",
    	"connected_since"	:new Date(0),
    	"connected_time"	:0,
    	"socket"			:null
    };

    this.control = {
    	"address"			:"0.0.0.0",
    	"status"			:"offline",
    	"connected_since"	:new Date(0),
    	"connected_time"	:0,
    	"socket"			:null
    };

    this.rs485 = {
    	"address"			:"0.0.0.0",
    	"status"			:"offline",
    	"connected_since"	:new Date(0),
    	"connected_time"	:0,
    	"socket"			:null,
    	"data"				:{

    		"binary_string"		:"",
    		"binary"			:"",
    		"hexadecimal"		:0x00,
    	},
    	"lights"				:initLights(),
    	"demo"					:demoLights,
    	"off"					:offLights,
    	"on"					:onLights,
    	"encode"				:encodeLights,
    	"send"					:sendLights
    };



    // Funciones **********************************

   
    function sendLights(){
    	global.DEVICES.rs485.socket.write( global.DEVICES.rs485.data.binary );
    }

    function initLights(){
    	var lights =[];
    	for( var l = 0 ; l < 50*8 ; l++ ){
	        lights[l] = Math.round(Math.random());
	    }
	    return lights;
    }

    function offLights(){
    	var lights =[];
    	for( var l = 0 ; l < 50*8 ; l++ ){
	        lights[l] = 0;
	    }
	    global.DEVICES.rs485.lights = lights;
    }

    function onLights(){
    	var lights =[];
    	for( var l = 0 ; l < 50*8 ; l++ ){
	        lights[l] = 1;
	    }
	    global.DEVICES.rs485.lights = lights;
    }

    function demoLights(){
    	var lights =[];
    	for( var l = 0 ; l < 50*8 ; l++ ){
	        // lights[l] = 1;
	        // lights[l] = (l%6 == 0) ? 1:0;
	        lights[l] = Math.round(Math.random());
	        // lights[l] = 0;
	    }
	    global.DEVICES.rs485.lights = lights;
    }


    function zeros( n ){
        var z = '';

        for( var i = 0 ; i < n ; i++ ){
            z += '0'
        }
        return z;
    }

    function toHex( n ){
        n = n.toString(16).toUpperCase()
        if( n.length == 1 ){
            return '0' + n;
        }
        return n;
    }

    // function console_log( texto ){
    //     console.log(texto);
    //     textoConsola += texto + '\n';
    // }

    function encodeLights(){
    	var vector;
        var vectorString = '';
        var vectorBit = '';
        var vectorHEX = 0x00;
        var vectorASCII = 0x00;
        var dataBinary = '';
        var dataHEX = '';
        var dataASCII = '';
        var stringASCII = '';

        var bufView = Buffer(51)//new Uint8Array(400);
        var nbuff=1; // Espacio para el header, sino empezaria en 0
        var z;

        var lights = global.DEVICES.rs485.lights;

        bufView[0] = parseInt( 0x5A , 10 ); // Header 0x5A con conversion a decimal
        num = 0;
        for( var l = 0 ; l < 50*8 ; l++ ){
            // console_log('********** DATA ' + l / 8  + ' (' + l / 8 * 8 + ' - ' + (l +7) + ') **********')
            vector = 0;
            vectorString = '';
            vectorBit = '';
            for( var b = 0 ; b < 8 ; b++ ){

                vectorString = lights[ l + b ] + vectorString;
                z = b ;
                vectorBit = zeros(7-z) + lights[ l + b ] + zeros(z);
                // console_log( 'Luz ' + ( l + b ) + ': ' + lights[ l + b ] )
            }
            vector = parseInt( vectorString , 2 );
            bufView[nbuff] = vector;
            
            nbuff++;

            vectorHEX = toHex( vector );
            vectorASCII = String.fromCharCode(parseInt(vectorString,2))//String.fromCharCode(vector);

            dataBinary += vectorString;
            // dataASCII += vectorASCII;
            // dataASCII = new StringView(bufView); es una alternativa a la linea de arriba, mas solida.
            dataHEX += vectorHEX;
            // console_log( 'Binary:    ' + vectorString );
            // console_log( 'Decimal:   ' + vector );
            // console_log( 'Hexa:      0x' + vectorHEX );
            // console_log( 'ASCII:     ' + vectorASCII );
            // console_log('-------------------------------------');
            l+=7;
            stringASCII += vectorASCII;
            // num++;
        	// console.log(num + ": " + vector + " / " + vectorASCII);
        }
        // dataASCII = new StringView(bufView);

        function uintToString(ua) {
            var s = '';
            for (var i = 0; i < ua.length; i++) {
                // s += String.fromCharCode(ua[i]);
                s += ua.toString('binary');
            }
            return s;
        }

        


        dataASCII = bufView;
        
        global.DEVICES.rs485.data.binary_string 	= dataBinary;
       	global.DEVICES.rs485.data.binary			= dataASCII;
        global.DEVICES.rs485.data.hexadecimal	= dataHEX;

        // dataASCII = new StringView(bufView);
        // console.log(bufView);

    }
}

module.exports = Devices;