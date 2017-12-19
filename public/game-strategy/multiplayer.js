'use strict';

import Strategy from './strategy.js';

import bus from '../modules/event-bus.js';

import { EVENTS } from './events.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class MultiPlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        const address = ['https', 'https:'].includes(location.protocol) ?
            `wss://${location.host}/ws` :
            `ws://${location.host}/ws`;

        this.canUserGo = false;
        this.gameType = 'multiplayer';
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
                this.ws.send(EVENTS.GAME.ROUND);
                this.canUserGo = false;
                this.preloader.hideIlluminate();
            }
        };

        bus.on(EVENTS.GAME.OPPORTUNITY_TO_GO, (payload) => {
            this.canUserGo = payload.payload;
            this.canUserGo
                ? this.preloader.illuminate()
                : this.preloader.hideIlluminate();
        });

        bus.on(EVENTS.CARD.CHOOSE, (payload) => {
            const card = payload.payload.card;
            if (this.canUserGo) {
                this.userGo(card);
                this.ws.send(JSON.stringify({
                    event: EVENTS.GAME.USERGO,
                    payload: card.index
                }));
                this.canUserGo = false;
                this.preloader.hideIlluminate();
            }
        });
    }
}
