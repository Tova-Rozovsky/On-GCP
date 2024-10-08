import { Server } from 'socket.io';
import app from './app.js';
import { createServer } from 'http';


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT']
  }
});

let clientConnected = false;

io.on('connection', (socket) => {
    if (!clientConnected) {
        console.log('Client connected');
        clientConnected = true;     

    }

    socket.on('postRequest', (request) => {
        console.log('New request received:', request);
        console.log(request);
        io.emit('addRequest', request);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clientConnected = false;
    });
});


server.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);


  });







