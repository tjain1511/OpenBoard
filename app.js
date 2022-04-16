const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    var query = socket.handshake.query;
    var roomId = query.roomId;
    socket.join(roomId);

    socket.on('screen_state', (data, roomId) => {
        socket.to(roomId).emit('server data emit', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});

server.listen('3000', function () {
    console.log("hello");
})