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

        this.busCallbacks = [];

        let cb = bus.on('SHOWCARD', (payload) => {
            const card = payload.payload;
            card.onboard === false
                ? this.el.appendChild(this.createImg(card))
                : card.domEl.onmouseover = null;
        });
        this.busCallbacks.push(cb);

        cb = bus.on('HIDECARD', () => {
            this.clean();
        });
        this.busCallbacks.push(cb);
    }

    clean() {
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }

    createImg(card) {
        let domEl = document.createElement('div');
        let cl = 'game-view__bigimg card-lg-' + card.faction + ' card-lg-' + card.faction + '-'+ card.index;
        domEl.setAttribute('class', cl);
        return domEl;
    }

    destroy() {
        this.busCallbacks.forEach((f) => {
            f();
        });
    }
}
