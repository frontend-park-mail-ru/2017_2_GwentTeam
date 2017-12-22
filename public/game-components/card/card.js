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
        //domEl.setAttribute('class', 'card-img card-sm-monster card-sm-monster-'+ this.index);
        domEl.setAttribute('class', 'card-img card-sm-nilfgaardian card-sm-nilfgaardian-'+ this.index);
        return domEl;
    }

    deleteImg() {
        this.domEl.remove();
    }

    illuminate() {
        //this.domEl.setAttribute('class', 'card-img__illumination card-sm-monster card-sm-monster-'+ this.index);
        this.domEl.setAttribute('class', 'card-img__illumination card-sm-nilfgaardian card-sm-nilfgaardian-'+ this.index);
    }
}
