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


const WebSocketServer = new require('ws');


 const webSocketServer = new WebSocketServer.Server({ port: 8001});
 webSocketServer.on('connection', function(ws) {

  let id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  game.addPlayer(ws);
})

// else if (message.event === 'userGo') {
//   console.log('userGo');
//   const cardIndex = message.payload;
//   state[0].line4.forEach((card, index) => {
//     if (card.index === cardIndex) {
//       state[0].roundScores += card.score;
//       state[0].line4.splice(index, 1);
//       if (card.type === 'b') {
//                 state[0].line1.push(card);
//               }
//               if (card.type === 'c') {
//                 state[0].line2.push(card);
//               }
//               if (card.type === 'd') {
//                 state[0].line3.push(card);
//               }
//     }
//   })
//   let maxCard = state[1].line4[0];
//   let index = 0;
//   state[1].line4.forEach((card, cardIndex) => {
//       if (maxCard.score < card.score) {
//           maxCard = card;
//           index = cardIndex;
//       }
//   });
//       state[1].line4.splice(index, 1);
//       state[1].roundScores += maxCard.score;
//       if (maxCard.type === 'b') {
//                 state[1].line1.push(maxCard);
//               }
//               if (maxCard.type === 'c') {
//                 state[1].line2.push(maxCard);
//               }
//               if (maxCard.type === 'd') {
//                 state[1].line3.push(maxCard);
//               }
//               ws.send(JSON.stringify({event: 'OPPONENTGO', payload: {
//                 card: maxCard,
//                 score: {
//                   userScore: state[0].roundScores,
//                   userRounds: state[0].roundWin,
//                   opponentScore: state[1].roundScores,
//                   opponentRounds: state[1].roundWin
//                 }}}));
//     }
//     else if(message.event === 'pass') {
//       console.log('pass');
//       if (state[0].roundScores >= state[1].roundScores) {
//         state[0].roundWin += 1;
//       }
//       else {
//         state[1].roundWin += 1;
//       }
//       state[0].roundScores = 0;
//       state[1].roundScores = 0;
//       if (state[1].roundWin > 2) {
//         ws.send(JSON.stringify({event: 'GAMEOVER', payload: false}));
//       }
//       else if (state[0].roundWin > 2) {
//         ws.send(JSON.stringify({event: 'GAMEOVER', payload: true}));
//       }
//       else {
//          ws.send(JSON.stringify({event: 'ROUND', payload: {
//            userScore: state[0].roundScores,
//            userRounds: state[0].roundWin,
//            opponentScore: state[1].roundScores,
//            opponentRounds: state[1].roundWin
//          }}));
//       }
//       //console.log(isUserWin);
//       //ws.send(JSON.stringify({event: 'ROUND', payload: isUserWin}));
//     }
// });

// ws.on('close', function() {
//   console.log('соединение закрыто ' + id);
//   delete clients[id];
// });

//});
