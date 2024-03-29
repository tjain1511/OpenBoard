const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const map1 = new Map();

io.on('connection', (socket) => {
    console.log('a user connected : ' + socket.id);


    let query = socket.handshake.query;
    let roomId = query.roomId;


    socket.join(roomId);


    if (map1.has(roomId)) {
        io.to(socket.id).emit('server_data', map1.get(roomId));
    }

    socket.on('screen_state', (data, roomId) => {
        map1.set(roomId, data);
        socket.to(roomId).emit('server_data', data);
    })

    socket.on('send-msg', (msg, sender) => {
        console.log(msg, sender);
        socket.to(roomId).emit('receive-msg', msg, sender);
    })

    socket.on('peerId', (roomId, id) => {
        socket.broadcast.to(roomId).emit('new-peer', id);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});


app.post('/', function (req, res) {
    console.log(req.body);


    //if validated

    let details = {
        'name': req.body.name,
        'roomId': req.body.roomId,
        'role': req.body.role,
    }
    if (details.role === 'admin') {
        res.render('board', details);
    } else {
        if (map1.has(details.roomId))
            res.render('userBoard', details);
        else
        res.send(`Room with Id ${details.roomId} doesn't exist :/ `)
    }
})



app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || '3000', function () {
    console.log("Server started on port 3000");
})