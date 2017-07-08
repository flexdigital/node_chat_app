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

    socket.emit('newMessage', {
        from: 'Sarah Bennet',
        text: 'Hey, Jenny! This is Sarah',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (msg) => {
        console.log('Create Message', msg);
    });
    socket.on('disconnect', () => {
        console.log('Browser disconnected');
    });
});

// porting
server.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});
