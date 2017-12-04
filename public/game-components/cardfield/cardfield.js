'use strict';

import './cardfield.styl';

export default class Cardfield {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view__cardfield');
    }

    addCard(card) {
        this.el.appendChild(card);
    }

    clean() {        //
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }
}
