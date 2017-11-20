'use strict';

const express = require('express');
const app = express();
const fallback = require('express-history-api-fallback');
// const ws = require('express-ws');
// ws(app);

app.use(express.static('build'));
app.use(fallback('index.html', { root: 'build' }));

// app.ws('/ws', function (ws, req) {
// 	console.log(`Новый ws-коннекшн`);
// //game.addPlayer(ws);
//   let id = Math.random();
//   clients[id] = ws;
//   console.log("новое соединение " + id);
//
//   ws.on('message', function(message) {
//     console.log('получено сообщение ' + message);
//     for (let key in clients) {
//       clients[key].send(message);
//     }
//   });
//
//   ws.on('close', function() {
//     console.log('соединение закрыто ' + id);
//     delete clients[id];
//   });
// });

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`Server listening port ${port}`);
});



const WebSocketServer = new require('ws');

// подключенные клиенты
let clients = {};

const webSocketServer = new WebSocketServer.Server({
  port: 8001
});
webSocketServer.on('connection', function(ws) {

  let ind = 0;
  let allCards = [];
      let typeOfCards = ['b', 'c', 'd'];
      typeOfCards.forEach((type) => {
          for (let i = 1; i < 9; i++) {
              allCards.push({
                  type: type,
                  score: i,
                  index: ind
              });
              ind++;
          }
      });
  let id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  let state = [{
          playerName: 'User',
          roundWin: 0,
          roundScores: 0,
          line1: [],
          line2: [],
          line3: [],
          line4: []
      },{
          playerName: 'Computer',
          roundWin: 0,
          roundScores: 0,
          line1: [],
          line2: [],
          line3: [],
          line4: []
      }];

  ws.on('message', function(event) {
    const message = JSON.parse(event);
    console.log('получено сообщение ');
    if (message.event === 'dealCards') {
            console.log('deal');
            for(let i = 0; i < 8; i++) {
                state.forEach((player) => {
                    const cardIndex = Math.floor(Math.random() * allCards.length);
                    player.line4.push(allCards[cardIndex]);
                    allCards.splice(cardIndex, 1);
                });
            }
            ws.send(JSON.stringify({event: 'DEALCARDS', payload: state[0].line4}));
  }
  else if (message.event === 'userGo') {
    console.log('userGo');
    const cardIndex = message.payload;
    state[0].line4.forEach((card, index) => {
      if (card.index === cardIndex) {
        state[0].line4.splice(index, 1);
        if (card.type === 'b') {
                  state[0].line1.push(card);
                }
                if (card.type === 'c') {
                  state[0].line2.push(card);
                }
                if (card.type === 'd') {
                  state[0].line3.push(card);
                }
      }
    })
    let maxCard = state[1].line4[0];
    let index = 0;
    state[1].line4.forEach((card, cardIndex) => {
        if (maxCard.score < card.score) {
            maxCard = card;
            index = cardIndex;
        }
    });
        state[1].line4.splice(index, 1);
        if (maxCard.type === 'b') {
                  state[1].line1.push(maxCard);
                }
                if (maxCard.type === 'c') {
                  state[1].line2.push(maxCard);
                }
                if (maxCard.type === 'd') {
                  state[1].line3.push(maxCard);
                }
                ws.send(JSON.stringify({event: 'OPPONENTGO', payload: maxCard}));
      }
      else if(message.event === 'pass') {
        console.log('pass');
      }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});
