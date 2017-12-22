'use strict';

import Strategy from './strategy.js';

import bus from '../modules/event-bus.js';
import UserService from '../services/user-service.js';
import { EVENTS } from './events.js';

const userService = new UserService();

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

        this.ws.onopen = () => {
            //console.log(userService);
            const message = JSON.stringify({
                event: 'LALALA',
                payload: userService.user.email
            });
            this.ws.send(message);
        };

        this.ws.onclose = () => {
            this.showMessage('Игра оборвалась');
        };

        //console.log();

        this.btnPassEl.el.onclick = () => {
            if (this.canUserGo) {
                this.ws.send(EVENTS.GAME.ROUND);
                this.canUserGo = false;
                this.preloader.hideIlluminate();
            }
        };

        bus.on(EVENTS.GAME.OPPORTUNITY_TO_GO, (payload) => {
            this.canUserGo = payload.payload;
            this.canUserGo ?
                this.preloader.illuminate() :
                this.preloader.hideIlluminate();
        });

        bus.on(EVENTS.CARD.CHOOSE, (payload) => {
            const card = payload.payload.card;
            //if (this.canUserGo) {
            this.userGo(card);
            this.ws.send(JSON.stringify({
                event: EVENTS.GAME.USERGO,
                payload: card.index
            }));
            //    this.canUserGo = false;
            this.preloader.hideIlluminate();
            //}
        });
    }
}
