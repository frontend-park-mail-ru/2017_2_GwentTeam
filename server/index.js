'use strict';

const express = require('express');
const body = require('body-parser');
const fallback = require('express-history-api-fallback');

const Game = require('./game');

const app = express();
app.use(express.static('build'));
app.use(fallback('index.html', {
    root: 'build'
}));
app.use(body.json());

const users = {
    'a1': {
        login: 'a1',
        email: 'a@mail.ru',
        password: 1234,
        scores: 12
    },
    'a2': {
        login: 'a2',
        email: 'a2@mail.ru',
        password: 1234,
        scores: 10
    },
    'a3': {
        login: 'a3',
        email: 'a3@mail.ru',
        password: 1234,
        scores: 11
    }
};

const game = new Game();

// app.get('/users', (req, res) => {
//     let us = null;
//     Object.values(users).forEach((element) =>{
//         us[element.login].push(element.login, element.scores);
//     });
//
//     //const scorelist = Object.values(users)
//         // .sort((l, r) => r.scores - l.scores)
//         // .map(user => {
//         //     return {
//         //         email: user.email,
//         //         age: user.age,
//         //         scores: user.scores,
//         //     };
//         // });
//     res.json(us);
// });

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
