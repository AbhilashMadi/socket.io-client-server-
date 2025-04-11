import express, { json } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';

const PORT = 8080;

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express setup
const app = express();
app.use(json());
app.use('/static', express.static(path.join(__dirname, 'public')));

const server = createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', (message) => {
    console.log(`📩 Message from ${socket.id}:`, message);

    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
