// run: `node server`
// test: `netcat 127.0.0.1 2115`
var net      = require('net');
var server   = net.createServer();
var queue    = [];
var POOLSIZE = 5;
var PORT     = 2115;

server.on('listening', function () {
  console.log('TCP server listening on port %s', PORT);
  this.count = 0;
});

server.on('connection', function (socket) {
  console.log('connected to %s', socket.remotePort);

  if (this.count < POOLSIZE) {
    converse(socket); 
    this.count++;
  } else {
    queue.push(socket);
  }
});

server.on('connection-closed', function () {
  if (queue.length) {
    converse(queue.shift());
  } else {
    this.count--;
  }
});

function converse(socket) {
  socket.on('data', function (buf) {
    console.log('incoming requestion from=%s:%d for=%s', socket.remoteAddress, socket.remotePort, buf.toString('utf8'));
    socket.write('braj\n');
  });

  socket.on('end', function () {
    console.log('ennnnd');
    server.emit('connection-closed');
  });
}

server.listen(PORT, '127.0.0.1');
