'use strict';

import './selected-card.styl';

import bus from '../../modules/event-bus.js';

export default class SelectedCard {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view__sel-card');

        bus.on('SHOWCARD', (payload) => {
            this.clean();
            this.el.appendChild(this.createImg(payload.payload.index));
        });

        bus.on('HIDECARD', () => {
            this.clean();
        });
    }

    clean() {
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }

    createImg(index) {
        const src = './img/cards/' + index + '.png';
        let domEl = document.createElement('img');
        domEl.setAttribute('src', src);
        domEl.setAttribute('class', 'game-view__bigimg');
        return domEl;
    }
}
