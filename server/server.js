const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// dont define port hardcoded for heroku upload:
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey, what is going on.',
    //     createAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'freddy',
    //     text: 'Hey there its the server speaking',
    //     createdAt: 1234
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
