// requirements
require('./config/config');

// global imports
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const port = process.env.PORT;

// app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// middleware
app.use(express.static(publicPath));

// events
io.on('connection', (socket) => {
    console.log('New browser connection');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room Name are required.');
        }
        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Chat Bot', `Welcome to Ghost Chat! You\'re in chat room ${params.room}.`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Chat Bot', `${params.name} has joined.`));
        socket.on('createMessage', (msg, callback) => {
        console.log('Create Message', msg);
        io.to(params.room).emit('newMessage', generateMessage(params.name, msg.text));
        callback();
    });
        callback();
    });
    // socket.on('createMessage', (msg, callback) => {
    //     console.log('Create Message', msg);
    //     io.emit('newMessage', generateMessage(msg.from, msg.text));
    //     callback();
    // });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Chat Bot', coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () => {
        console.log('Browser disconnected');
    });
});

// porting
server.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});
