'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');

const Game = require('./game');

const game = new Game();

const app = express();
app.use(express.static('build'));
app.use(fallback('index.html', {
    root: 'build'
}));

let clients = {};

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});

const WebSocketServer = new require('ws');

const webSocketServer = new WebSocketServer.Server({
    server: server
});
webSocketServer.on('connection', (ws) => {

    let id = Math.random();
    clients[id] = ws;

    game.addPlayer(ws);
});
