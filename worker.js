module.exports = converse;

function converse(socket) {
  console.log('WTF IN A SOCKET BEE');

  socket.on('close', function () {
    console.log('a connection closed');
  });

  socket.on('data', function (buf) {
    console.log('Incoming request from=%s:%s for %s', socket.remoteAddress, socket.remotePort, buf.toString('utf8'));
    socket.write('braj\n');
  });
}