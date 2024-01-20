const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const redis = require('socket.io-redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use the Redis adapter for Socket.IO
io.adapter(redis({ host: '172.20.10.8', port: 6379 })); 
mongoose.connect('mongodb://172.20.10.4,172.20.10.5,172.20.10.7/whiteboardDB?replicaSet=rs1icc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const drawingSchema = new mongoose.Schema({
  type: String,
  x: Number,
  y: Number,
  prevX: Number,
  prevY: Number,
  width: Number,
  height: Number,
  radius: Number,
  color: String,
});

const Drawing = mongoose.model('Drawing', drawingSchema);

app.use(express.static(__dirname + '/public'));

io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);

  try {
    const existingData = await Drawing.find({});
    io.to(socket.id).emit('initialData', existingData);

    socket.on('draw', async (data) => {
      const newDrawing = new Drawing(data);
      await newDrawing.save();

      io.emit('draw', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
