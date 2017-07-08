// requirements
require('./config/config');

// global imports
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
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

    socket.on('createMessage', (msg) => {
        console.log('Create Message', msg);
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect', () => {
        console.log('Browser disconnected');
    });
});

// porting
server.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});
