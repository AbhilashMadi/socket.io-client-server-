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

const server = createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', ({ message, room }) => {
    const socketId = socket.id;

    if (room) {
      console.log(`Broadcast message from ${socketId} - to ${room}`, message);
      socket.to(room).emit('message', message);
      return;
    }

    console.log(`Broadcast message from ${socketId}:`, message);
    socket.broadcast.emit('message', `${socketId}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get('/api', async (req, res) => {
  console.log('API hit');
  res.json({ message: 'Hello from API' });
});

app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.get('/{*splat}', (_, res) => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')));

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});