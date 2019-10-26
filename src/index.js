require('dotenv').config();

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const initMongoDB = require('./config/mongodb');

initMongoDB();

const app = express();
const server = new http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

module.exports = server.listen(port, () => console.log(`Server listening on port ${port}`));