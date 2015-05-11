// run: `node server`
// test: `netcat 127.0.0.1 2115`
var net = require('net');
 
var server = net.createServer(function (socket) {
  socket.on('close', function () {
    console.log('a connection closed');
  });

  socket.on('data', function (buf) {
    console.log('Incoming request from=%s:%s for %s', socket.remoteAddress, socket.remotePort, buf.toString('utf8'));
    socket.write('braj\n');
  });
});

server.on('connection', function (socket) {
  console.log('connected to %s', socket.remotePort);
});
 
server.listen(2115, '127.0.0.1');
