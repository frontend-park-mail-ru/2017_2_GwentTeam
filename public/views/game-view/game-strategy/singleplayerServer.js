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
            ws.send('startGame');

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

            this.gamefield = [];

            for (let i = 0; i < 6; i++) {
                this.gamefield.push(document.createElement('div'));
            }

            this.gamefield.forEach((field) => {
                field.setAttribute('class', 'game-board__board-item');
                this.boardEl.appendChild(field);
            });

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
                bus.emit('ROUND');
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

            ws.send('dealCards');

            bus.on('DEALCARDS', (payload) => {                                //TODO
                const data = payload.payload;
                console.log(data);
                data.forEach((card) => {
                    this.state.line4.push(card);
                })
            });
        }

        //     bus.on('CHOOSECARD', (payload) => {                                //TODO
        //         const data = payload.payload;
        //         this.userGo(data.playerIndex, data.cardIndex);
        //         this.competitorGo();
        //         if (this.isGameOver()) {
        //             this.GameOver();
        //         }
        //         this.rerender();
        //     });
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
        // userGo(playerIndex, cardIndex) {
        //     this.pushCardInLine(playerIndex, cardIndex);
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
        // pushCardInLine(playerIndex, cardIndex) {
        //     const card = this.state[playerIndex].line4[cardIndex];
        //     if (card.type === 'b') {
        //         this.state[playerIndex].line1.push(card);
        //     }
        //     if (card.type === 'c') {
        //         this.state[playerIndex].line2.push(card);
        //     }
        //     if (card.type === 'd') {
        //         this.state[playerIndex].line3.push(card);
        //     }
        //     this.state[playerIndex].roundScores += card.score;
        //     this.state[playerIndex].line4.splice(cardIndex, 1);
        // }
        //
        //
        // dealCards(countOfCards) {
        //     for(let i = 0; i < countOfCards; i++) {
        //         this.state.forEach((player) => {
        //             const cardIndex = Math.floor(Math.random() * this.allCards.length);
        //             player.line4.push(this.allCards[cardIndex]);
        //             this.allCards.splice(cardIndex, 1);
        //         });
        //     }
        // }
        //
        // whoWinRound(user1, user2) {
        //     let score1 = this.scoreCount(user1);
        //     let score2 = this.scoreCount(user2);
        //     if (score1 > score2) return user1;
        //     return user2;
        // }
        //
        // whoWinGame(user1, user2) {
        //     if (user1.roundWin === 2) {
        //         return user1;
        //     }
        //     return user2;
        // }
        //
        // scoreCount(profile) {
        //     let count = 0;
        //     profile.line1.forEach((card) => {
        //         count += card.score;
        //     });
        //     profile.line2.forEach((card) => {
        //         count += card.score;
        //     });
        //     profile.line3.forEach((card) => {
        //         count += card.score;
        //     });
        //     return count;
        // }
        //
        // fullscreen(element) {
        //     if(element.requestFullscreen) {
        //         element.requestFullscreen();
        //     } else if(element.mozRequestFullScreen) {
        //         element.mozRequestFullScreen();
        //     } else if(element.webkitRequestFullscreen) {
        //         element.webkitRequestFullscreen();
        //     } else if(element.msRequestFullscreen) {
        //         element.msRequestFullscreen();
        //     }
        // }
    }
}
