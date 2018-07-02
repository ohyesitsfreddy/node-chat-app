const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// dont define port hardcoded for heroku upload:
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
