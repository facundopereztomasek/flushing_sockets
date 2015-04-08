// RS485 CONVERSOR ETHERNET HANDLER

var rs485 =  function(){
    var net = require('net');
    var HOST = '192.168.10.113';
    var PORT = 2345;

    // Crea la conexion hacia el dispositivo RS485
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        // client.write('Hello, RS485! Love, Client.');

        global.DEVICES.rs485.socket = client;
        global.DEVICES.rs485.address = HOST;

        console.log( "Conectado a RS485: " + HOST );
        global.DEVICES.rs485.encode();
        global.DEVICES.rs485.send();

        setInterval(function(){
            global.DEVICES.rs485.demo();
            global.DEVICES.rs485.encode();
            global.DEVICES.rs485.send();            

            setTimeout(function(){
                global.DEVICES.rs485.off();
                global.DEVICES.rs485.encode();
                global.DEVICES.rs485.send();            
            },1000);

            setTimeout(function(){
                global.DEVICES.rs485.on();
                global.DEVICES.rs485.encode();
                global.DEVICES.rs485.send();            
            },2000)
        },3000);

        // var fs = require('fs');
        // fs.writeFile("binaryData.jpg", global.bufView, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // }); 
        
        console.log(global.DEVICES.rs485.data.hexadecimal);
        console.log(global.DEVICES.rs485.data.binary);
    });
}

module.exports = rs485;