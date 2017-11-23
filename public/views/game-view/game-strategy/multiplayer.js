'use strict';

import Strategy from './strategy.js';
import bus from '../../../modules/event-bus.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class MultiPlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        this.canUserGo = false;
        // const address = ['https', 'https:'].includes(location.protocol) ?
        //     `wss://${location.host}/ws` :
        //     `ws://${location.host}/ws`;
        // //console.log(address);
        //
        // this.ws = new WebSocket(address);
        // this.ws.onopen = function(event) {
        //     console.log(`WebSocket on address ${address} opened`);
        //     this.ws.send('StartGame');
        //     //console.log(this.ws);
        // }

        this.ws = new WebSocket('ws://localhost:8001/game'); //TODO
        this.ws.onmessage = function(event) {
            const message = JSON.parse(event.data);
            bus.emit(message.event, message.payload);
        };

        this.ws.onclose = function() {
            alert('Игра оборвалась');
            //this.router.go('/');
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
        this.btnPassEl.onclick = () => {
            if (this.canUserGo) {
                this.ws.send('ROUND');
                this.canUserGo = false;
            }
        };

        bus.on('DEALCARDS', (payload) => {
            const data = payload.payload;
            //console.log(data);
            data.forEach((card) => {
                const cardEl = this.createCardImg(card.index);
                this.cardfield.appendChild(cardEl);
                this.state.line4.push({
                    type: card.type,
                    score: card.score,
                    domEl: cardEl,
                    index: card.index
                });
                cardEl.onclick = (e) => {
                    //console.log(e.target);
                    bus.emit('CHOOSECARD', {
                        card
                    });
                    e.target.onclick = null;
                    //console.log(card);
                };
            });
        });
        //}

        bus.on('OPPORTUNITY_TO_GO', (payload) => {
            const data = payload.payload;
            this.canUserGo = data;
        });

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            if (this.canUserGo) {
                this.userGo(data);
                this.ws.send(JSON.stringify({
                    event: 'userGo',
                    payload: data.index
                }));
                this.canUserGo = false;
            }
        });

        bus.on('OPPONENTGO', (payload) => {
            const data = payload.payload; //&
            this.opponentGo(data.card);
            this.printScore(data.score);
            this.canUserGo = true;
        });

        bus.on('ROUND', (payload) => {
            const data = payload.payload;
            this.printScore(data);
            this.state.roundWin = data.userRounds;
            this.state.roundScores = 0;
            this.cleanBoard();
            this.cleanState(this.state);
        });

        bus.on('GAMEOVER', (payload) => {
            const data = payload.payload;
            this.showResult(data);
        });
    }

    userGo(data) {
        this.state.line4.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                card.domEl.remove();
                this.pushCardInLine(this.userGamefield, card);
                this.pushCardInState(this.state, card);
                this.state.roundScores += card.score;
                this.state.line4.splice(cardIndex, 1);
            }
        });
        this.userScoreField.innerHTML = 'Очков за раунд: ' + this.state.roundScores +
            '<br/><br/>Выиграно раундов:  ' + this.state.roundWin;
    }

    opponentGo(card) {
        card.domEl = this.createCardImg(card.index);
        this.pushCardInLine(this.opponentGamefield, card);
    }

}
