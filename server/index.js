const io = require("socket.io")(5000);

const users = {};

io.on('connection', socket => {

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('new-user', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {name: users[socket.id], message: message});
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})