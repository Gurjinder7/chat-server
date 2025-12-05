const createSocketConnection = (url) => {
    const socket = new WebSocket(url);
    socket.addEventListener("open", (event) => {
        console.log("Connected");
        console.log(event)
        socket.send('hello')
    })

// Listen for messages and executes when a message is received from the server.
    socket.addEventListener('message', event => {
        console.log('Message from server: ', event.data);
    });
// Executes when the connection is closed, providing the close code and reason.
    socket.addEventListener('close', event => {
        console.log('WebSocket connection closed:', event.code, event.reason);
    });
// Executes if an error occurs during the WebSocket communication.
    socket.addEventListener('error', error => {
        console.error('WebSocket error:', error);
    });

}

export {createSocketConnection};