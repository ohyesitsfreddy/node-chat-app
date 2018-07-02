let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey. this is andrew'
    //     });
    socket.emit('createMessage', {
        to: 'Freddy',
        text: 'Hello im the browser'
        });
});

 socket.on('newMessage', function (message) {
        console.log('New Message', message);
    })

    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    socket.on('newEmail', function (email) {
        console.log('New Email', email);
    });   