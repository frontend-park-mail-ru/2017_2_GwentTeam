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
            const card = payload.payload;
            card.onboard === false
                ? this.el.appendChild(this.createImg(card.img))
                : card.domEl.onmouseover = null;
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

    createImg(img) {
        let domEl = document.createElement('div');
        domEl.setAttribute('class', 'card-lg-monster card-lg-monster-'+ img);
        return domEl;
    }
}
