'use strict';

import Strategy from './strategy.js';
import GameScene from './single-scene.js';
import bus from '../../../modules/event-bus.js';
/**
* @module GameView
* @extends BaseView
*/
export default class SinglePlayerStrategy extends Strategy {
    constructor(router, el) {

        super();

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

            this.router = router;
            this.el = el;

            this.gameEl = document.createElement('div');
            this.gameEl.setAttribute('class', 'game-view');
            this.el.appendChild(this.gameEl);

            //let html = document.documentElement;
            //this.fullscreen(html);
            this.profilefield = document.createElement('div');
            this.profilefield.setAttribute('class', 'game-view__profilefield');
            this.gameEl.appendChild(this.profilefield);

            this.btnExitEl = document.createElement('div');
            this.btnExitEl.setAttribute('class', 'profilefield__btn-exit');
            this.btnExitEl.innerHTML = 'В главное меню';
            this.profilefield.appendChild(this.btnExitEl);

            this.btnExitEl.onclick = () => {
                this.router.go('/');
            };

            this.boardEl = document.createElement('div');
            this.boardEl.setAttribute('class', 'game-view__game-board');
            this.gameEl.appendChild(this.boardEl);

            this.userGamefield = [];
            this.opponentGamefield = [];

            for (let i = 0; i < 3; i++) {
              this.opponentGamefield.push(document.createElement('div'));
              this.userGamefield.push(document.createElement('div'));
            }

            this.opponentGamefield.forEach((field) => {
                field.setAttribute('class', 'game-board__board-item');
                this.boardEl.appendChild(field);
            });

            this.userGamefield.forEach((field) => {
              field.setAttribute('class', 'game-board__board-item');
            });
            for (let i = 2; i >= 0; i--) {
              this.boardEl.appendChild(this.userGamefield[i]);
            }

            this.cardfield = document.createElement('div');
            this.cardfield.setAttribute('class', 'game-view__cardfield');
            this.boardEl.appendChild(this.cardfield);

            //this.scene = new GameScene(this.boardEl, this.gamefield, this.cardfield, this.profilefield);

            // this.cardfield = cardfield;
            // this.el = gameview;
            // this.lines = gamefield;
            // this.profilefield = profilefield;

            this.compScoreField = document.createElement('div');
            this.compScoreField.setAttribute('class', 'profilefield__score');
            this.profilefield.appendChild(this.compScoreField);

            this.btnPassEl = document.createElement('div');
            this.btnPassEl.setAttribute('class', 'profilefield__btn-pass');
            this.btnPassEl.setAttribute('value', 'ПАС');
            this.btnPassEl.innerText = 'ПАС';
            this.btnPassEl.onclick = () => {
                //bus.emit('ROUND');
                  ws.send(JSON.stringify({event:'pass', payload: {}}));
            };
            this.profilefield.appendChild(this.btnPassEl);

            this.userScoreField = document.createElement('div');
            this.userScoreField.setAttribute('class', 'profilefield__score');
            this.profilefield.appendChild(this.userScoreField);

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
                console.log(data);
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

            bus.on('CHOOSECARD', (payload) => {                                //TODO
                const data = payload.payload.card;
                //console.log(data);
                this.userGo(data);
                // this.state.line4.forEach((card, cardIndex) => {
                //   if (card.index === data.index) {
                //     card.domEl.remove();
                //     this.userGo(cardIndex);
                //   }
                // })
                // this.state.line4[data.cardIndex].domEl.remove();
                // this.userGo(data.cardIndex);
                ws.send(JSON.stringify({event:'userGo', payload: data.index}));
                //this.competitorGo();
                // if (this.isGameOver()) {
                //     this.GameOver();
                // }
                //this.rerender();
            });

            bus.on('OPPONENTGO', (payload) => {
              const data = payload.payload;
              //console.log(data);
              this.opponentGo(data);
            })
        //
        //     bus.on('ROUND', ()  => {
        //         let user = this.whoWinRound(this.state[0], this.state[1]);
        //         user.roundWin += 1;
        //         if (this.isGameOver()) {
        //             this.GameOver();
        //         }
        //         this.dealCards(2);
        //         this.state.forEach((player) => {
        //             player.roundScores = 0;
        //         });
        //         this.rerender();
        //     });
        //
        //     this.render();
        // }
        //
        // rerender(){
        //     this.scene.render(this.state);
        // }
        //
        // start() {
        //     this.render();
        // }
        //
        // render() {
        //     this.rerender();
        //
        // }
        // GameOver() {
        //     let winner = this.whoWinGame(this.state[0], this.state[1]);
        //     alert(winner.playerName + ' выиграл!');
        // }
        //
        // isGameOver(){
        //     if (this.state[0].roundWin === 2 || this.state[1].roundWin === 2) {
        //         return true;
        //     }
        //     return false;
        // }
        //
      }
        // userGo(cardIndex) {
        //     this.pushCardInLine(cardIndex);
        // }
        //
        // competitorGo() {
        //     const playerIndex = 1;
        //     let comp = this.state[playerIndex];
        //     let maxCard = comp.line4[0];
        //     let index = 0;
        //     comp.line4.forEach((card, cardIndex) => {
        //         if (maxCard.score < card.score) {
        //             maxCard = card;
        //             index = cardIndex;
        //         }
        //     });
        //     this.pushCardInLine(playerIndex, index);
        // }
        //

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
            if (card.type === 'b') {
              this.opponentGamefield[2].appendChild(card.domEl);
            }
            if (card.type === 'c') {
              this.opponentGamefield[1].appendChild(card.domEl);
            }
            if (card.type === 'd') {
              this.opponentGamefield[0].appendChild(card.domEl);
            }
        }



    createCardImg(type, score) {
        const cardEl = document.createElement('img');
        const src = './img/cards/' + type + score + '.jpg';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }
}
