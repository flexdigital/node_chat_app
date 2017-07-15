// requirements
require('./config/config');

// global imports
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const port = process.env.PORT;

// app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// middleware
app.use(express.static(publicPath));

// events
io.on('connection', (socket) => {
    console.log('New browser connection');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room Name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Chat Bot', `Welcome to Ghost Chat! You\'re in chat room ${params.room}.`));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Chat Bot', `${params.name} has joined.`));

        socket.on('createMessage', (msg, callback) => {
        console.log('Create Message', msg);
        io.to(params.room).emit('newMessage', generateMessage(params.name, msg.text));
        callback();
    });
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Chat Bot', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Chat Bot', `${user.name} has left the room.`));
        }
    });

});

// porting
server.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});
