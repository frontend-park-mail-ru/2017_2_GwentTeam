'use strict';

import Strategy from './strategy.js';
import bus from '../modules/event-bus.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class MultiPlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        this.canUserGo = false;
        const address = ['https', 'https:'].includes(location.protocol) ?
            `wss://${location.host}/ws` :
            `ws://${location.host}/ws`;

        this.ws = new WebSocket(address);
        this.ws.onmessage = function(event) {
            const message = JSON.parse(event.data);
            bus.emit(message.event, message.payload);
        };

        this.ws.onclose = () => {
            this.showMessage('Игра оборвалась');
        };

        this.btnPassEl.el.onclick = () => {
            if (this.canUserGo) {
                this.ws.send('ROUND');
                this.canUserGo = false;
            }
        };

        bus.on('DEALCARDS', (payload) => {
            const data = payload.payload;
            data.forEach((card) => {
                const cardEl = this.createCardImg(card.index);
                this.cardfield.el.appendChild(cardEl);
                this.userState.gameCards.push({
                    type: card.type,
                    score: card.score,
                    domEl: cardEl,
                    index: card.index
                });
                cardEl.onclick = (e) => {
                    bus.emit('CHOOSECARD', {
                        card
                    });
                    e.target.onclick = null;
                };
            });
        });

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
            this.compScoreField.printScore({
                score: data.score.opponentScore,
                rounds: data.score.opponentRounds
            });
            this.canUserGo = true;
        });

        bus.on('ROUND', (payload) => {
            const data = payload.payload;
            this.compScoreField.printScore({
                score: data.opponentScore,
                rounds: data.opponentRounds
            });
            this.userScoreField.printScore({
                score: data.userScore,
                rounds: data.userRounds
            });
            this.userState.roundScores = 0;
            this.userState.roundWin = data.userRounds;
            this.cleanBoard();
            this.cleanState(this.userState);
        });

        bus.on('GAMEOVER', (payload) => {
            const data = payload.payload;
            this.showResult(data);
        });
    }

    userGo(data) {
        this.userState.gameCards.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                card.domEl.remove();
                this.pushCardInLine(this.userGamefield, card);
                this.pushCardInState(this.userState, card);
                this.userState.roundScores += card.score;
                this.userState.gameCards.splice(cardIndex, 1);
            }
        });
        this.userScoreField.printScore({
            score: this.userState.roundScores,
            rounds: this.userState.roundWin
        });

    }
    opponentGo(card) {
        card.domEl = this.createCardImg(card.index);
        this.pushCardInLine(this.opponentGamefield, card);
    }
}
