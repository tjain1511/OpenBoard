const express = require('express');
const app = express();
const http = require('http');
const { emit } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));
const map1 = new Map();

io.on('connection', (socket) => {
    console.log('a user connected');

    var query = socket.handshake.query;
    var roomId = query.roomId;
    socket.join(roomId);
    if (map1.has(roomId)) {
        io.to(socket.id).emit('server data emit', map1.get(roomId));
    }


    socket.on('screen_state', (data, roomId) => {
        map1.set(roomId,data);
        socket.to(roomId).emit('server data emit', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});

server.listen('3000', function () {
    console.log("hello");
})