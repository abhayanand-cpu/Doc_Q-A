const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const multer = require('multer');
const { handlePDFUpload } = require('./controllers/fileController');
const { handleWebSocketConnection } = require('./controllers/websocketController');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// File upload configuration
const upload = multer({ storage: multer.memoryStorage() });

// PDF upload route
app.post('/upload', upload.single('pdf'), handlePDFUpload);

// WebSocket route
io.on('connection', handleWebSocketConnection);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
