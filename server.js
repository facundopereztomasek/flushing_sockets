var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hola Mundo!!!\n');
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');