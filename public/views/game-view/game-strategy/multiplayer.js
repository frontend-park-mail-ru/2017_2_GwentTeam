'use strict';

import Strategy from './strategy.js';
import GameScene from './game-scene.js';
import bus from '../../../modules/event-bus.js';
/**
* @module GameView
* @extends BaseView
*/
export default class MultiPlayerStrategy extends Strategy {
  constructor(router, el) {

      super(router, el);

      const ws = new WebSocket('ws://localhost:8001/game');
      ws.onmessage = function(event){
          const message = JSON.parse(event.data);
          bus.emit(message.event, message.payload);
      };
      // ws.onerror = function(error) {
      //     console.log("Ошибка " + error.message);
      // };
      // ws.onclose = function(event) {
      //     if (event.wasClean) {
      //         console.log('Соединение закрыто');
      //     } else {
      //         console.log('Обрыв соединения');
      //     }
      //     console.log('Код: ' + event.code + ' причина: ' + event.reason);
      // };
      ws.onopen = () => {
          ws.send(JSON.stringify({event:'startGame', payload: {}}));

          this.btnPassEl.onclick = () => {
                ws.send(JSON.stringify({event:'pass', payload: {}}));
          };

          this.state = {
              playerName: 'User',
              roundWin: 0,
              roundScores: 0,
              line1: [],
              line2: [],
              line3: [],
              line4: []
          };

          ws.send(JSON.stringify({event:'dealCards', payload: {}}));

          bus.on('DEALCARDS', (payload) => {
              const data = payload.payload;
              data.forEach((card) => {
                  const cardEl = this.createCardImg(card.type, card.score);
                  this.cardfield.appendChild(cardEl);
                  this.state.line4.push({
                    type: card.type,
                    score: card.score,
                    domEl: cardEl,
                    index: card.index
                  });
                  const index = card.index;
                  cardEl.onclick = () => {
                      bus.emit('CHOOSECARD', { card });
                      //console.log(card);
                  };
              })
          });
      }

          bus.on('CHOOSECARD', (payload) => {
              const data = payload.payload.card;
              this.userGo(data);
              ws.send(JSON.stringify({event:'userGo', payload: data.index}));
          });

          bus.on('OPPONENTGO', (payload) => {
            const data = payload.payload;   //&
            //console.log(data);
            this.opponentGo(data.card);
            this.printScore(data.score);
          })

          bus.on('ROUND', (payload) => {
            const data = payload.payload;
            //console.log(data);
            this.printScore(data);
          })

          bus.on('GAMEOVER', (payload) => {
            const data = payload.payload;
            this.showResult(data);
          })
    }

      userGo(data) {
        this.state.line4.forEach((card, cardIndex) => {
              if (card.index === data.index) {
                card.domEl.remove();
                if (card.type === 'b') {
                  this.state.line1.push(card);
                  this.userGamefield[2].appendChild(card.domEl);
                }
                if (card.type === 'c') {
                  this.state.line2.push(card);
                  this.userGamefield[1].appendChild(card.domEl);
                }
                if (card.type === 'd') {
                  this.state.line3.push(card);
                  this.userGamefield[0].appendChild(card.domEl);
                }
                this.state.roundScores += card.score;
                this.state.line4.splice(cardIndex, 1);
              }
            })
      }

      opponentGo(card) {
          card.domEl = this.createCardImg(card.type, card.score);
          this.pushCardInLine(this.opponentGamefield, card);
          // if (card.type === 'b') {
          //   this.opponentGamefield[2].appendChild(card.domEl);
          // }
          // if (card.type === 'c') {
          //   this.opponentGamefield[1].appendChild(card.domEl);
          // }
          // if (card.type === 'd') {
          //   this.opponentGamefield[0].appendChild(card.domEl);
          // }
      }
}
