// requirements
require('./config/config');

// global imports
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');

// app
var app = express();
const port = process.env.PORT;

// middleware
app.use(express.static(publicPath));

// porting
app.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});
