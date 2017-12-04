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

        bus.on('GAMEOVER', (payload) => {
            const data = payload.payload;
            this.showResult(data);
        });
    }

    opponentGo(card) {
        card.domEl = this.createCardImg(card.index);
        this.pushCardInLine(this.opponentGamefield, card);
    }
}
