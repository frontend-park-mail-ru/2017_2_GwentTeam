'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');
const Game = require('./game');

const app = express();
// const ws = require('express-ws');
// //ws(app);
//app.use('/', express.static('build'));
app.use(express.static('build'));
app.use(fallback('index.html', { root: 'build' }));

const game = new Game();

let clients = {};

// app.ws('/ws', function(ws, req) {
//     console.log('Новый ws-коннекшн');
//     game.addPlayer(ws);
//     // ws.on('connection', function(ws) {
//     //     console.log('WS!');
//     // })
// });



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});


// const WebSocketServer = new require('ws');
//
//
//  const webSocketServer = new WebSocketServer.Server({ port: 8001});
//  webSocketServer.on('connection', function(ws) {
//
//   let id = Math.random();
//   clients[id] = ws;
//   console.log("новое соединение " + id);
//
//   game.addPlayer(ws);
// })
