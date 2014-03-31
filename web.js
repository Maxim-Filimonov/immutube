var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
var io = require('socket.io').listen(server, {origins: '*:*'});
console.log('http server listening on %d', port);

var corpus = '';

console.log('websocket server created');
io.on('connection', function (ws) {
  ws.on('edit', function(s) {
    ws.broadcast.emit('edit', s);
  });
});
server.listen(port);
