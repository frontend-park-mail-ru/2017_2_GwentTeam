'use strict';

import './card.styl';

import bus from '../../modules/event-bus.js';

import './monster-cards.styl';
import './nilfgaardian-cards.styl';

export default class Card {
    /**
     * @constructor
     */
    constructor(data) {
        this.score = data.score;
        this.type = data.type;
        this.index = data.index;
        this.faction = data.faction;

        this.onboard = false;

        this.domEl = this.createImg();
        this.domEl.onmouseover = () => {
            bus.emit('SHOWCARD', this);//TODO events
        };
        this.domEl.onmouseout = () => {
            bus.emit('HIDECARD');
        };
    }

    createImg() {
        let domEl = document.createElement('div');
        let cl = 'card-img card-sm-' + this.faction + ' card-sm-' + this.faction + '-' + this.index;
        domEl.setAttribute('class', cl);
        return domEl;
    }

    deleteImg() {
        this.domEl.remove();
    }

    illuminate() {
        let cl = 'card-img__illumination card-sm-' + this.faction + ' card-sm-' + this.faction + '-'+ this.index;
        this.domEl.setAttribute('class', cl);
    }
}
