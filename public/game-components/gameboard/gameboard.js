'use strict';

import './gameboard.styl';

export default class GameBoard {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-board__board-item');
    }

    clean() {
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }

    addCard(card) {
        this.el.appendChild(card.domEl);
    }
}
