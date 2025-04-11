import express, { json } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const PORT = 8080;

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express setup
const app = express();
app.use(json());

// Static folder
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Basic API route (optional)
app.get('/api', async (req, res) => {
  console.log('API hit');
  res.json({ message: 'Hello from API' });
});

// Fallback to SPA for unmatched routes
app.get('/{*splat}', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Create HTTP server
const server = createServer(app);

// Create socket server
const io = new SocketIOServer(server, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
});

// Enable admin UI
instrument(io, {
  auth: false,
  mode: 'development',
});

// Socket event handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', ({ message, room }) => {
    if (room) {
      console.log(`Room message from ${socket.id} to ${room}:`, message);
      socket.to(room).emit('message', message);
    } else {
      console.log(`Broadcast from ${socket.id}:`, message);
      socket.broadcast.emit('message', `${socket.id}: ${message}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin UI available at https://admin.socket.io`);
});
