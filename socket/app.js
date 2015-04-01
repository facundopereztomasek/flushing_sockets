// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);
// var fs = require('fs');

// app.listen(8000);

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });

// }


// io.on('connection', function (socket) {
//     console.log("Conexion entrante");
//     socket.emit('news', { hello: 'world' });
//     socket.on('device', function (data) {
//         console.log(data);
//     });
// });
// **********************************
// var net = require('net')

// var chatServer = net.createServer()
// var client;
// chatServer.on('connection', function(client) {
//   client.write('Hi!\n');
//   client.write('Bye!\n');

//   client.on('data', function(data) {
//     console.log(data)
//   })
// })

// chatServer.listen(9000)
// ***********************************

var net = require('net');

var HOST = 'localhost';
var PORT = 8000;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

// ********************************

// var net = require('net');
 
// var client = new net.Socket();
// client.connect(80, 'dev.bridgerconwaydigital.com', function() {
//     console.log('Connected');

//     client.write('get \n');

// });


 
// client.on('data', function(data) {
//     console.log('Received: ' + data);
//     client.destroy(); // kill client after server's response
// });
 
// client.on('close', function() {
//     console.log('Connection closed');
// });