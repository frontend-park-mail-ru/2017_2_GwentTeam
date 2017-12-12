'use strict';

import './card.styl';

import bus from '../../modules/event-bus.js';

export default class Card {
    /**
     * @constructor
     */
    constructor(data) {
        this.score = data.score;
        this.type = data.type;
        this.index = data.index;

        this.onboard = false;

        this.domEl = this.createImg();
        this.domEl.onmouseover = (event) => {
            bus.emit('SHOWCARD', this);
        };
        this.domEl.onmouseout = (event) => {
            bus.emit('HIDECARD');
        };
    }

    createImg() {
        const src = './img/new-cards/' + this.index + '.png';
        let domEl = document.createElement('img');
        domEl.setAttribute('src', src);
        domEl.setAttribute('class', 'cardfield__card-img');
        return domEl;
    }

    deleteImg() {
        this.domEl.remove();
    }

    illuminate() {
        this.domEl.setAttribute('class', 'card-img__illumination');
    }
}
