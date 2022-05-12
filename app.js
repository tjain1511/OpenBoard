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
    console.log('a user connected');

    let query = socket.handshake.query;
    let roomId = query.roomId;

    socket.join(roomId);
    if (map1.has(roomId)) {
        io.to(socket.id).emit('server data emit', map1.get(roomId));
    }


    socket.on('screen_state', (data, roomId) => {
        map1.set(roomId, data);
        socket.to(roomId).emit('server data emit', data);
    })

    socket.on('send-msg',(msg,sender)=>{
        console.log(msg,sender);
        socket.to(roomId).emit('receive-msg', msg,sender);
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
        'role' : req.body.role,
    }

    res.render('board', details);
})



app.use(express.static(__dirname + '/public'));

