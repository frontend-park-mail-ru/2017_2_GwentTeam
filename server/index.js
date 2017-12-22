'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');

const Game = require('./game');

const app = express();
app.use(express.static('build'));
app.use(fallback('index.html', {
    root: 'build'
}));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening port ${port}`);
});

const WebSocketServer = new require('ws');

const webSocketServer = new WebSocketServer.Server({
    server: server
});

let firstPlayer = null;
webSocketServer.on('connection', (ws) => {
    if (firstPlayer) {
        let game = new Game();
        game.addPlayer(firstPlayer);
        game.addPlayer(ws);

        firstPlayer = null;
    }
    else {
        firstPlayer = ws;
    }
});
