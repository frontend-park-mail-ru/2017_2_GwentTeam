'use strict';

import './gameboard.styl';

export default class GameBoard {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-board__line');


        this.boardEl = document.createElement('div');
        this.boardEl.setAttribute('class', 'game-board__board-item');
        this.el.appendChild(this.boardEl);

        this.scoreEl = document.createElement('div');
        this.scoreEl.setAttribute('class', 'game-board__score');
        this.scoreEl.innerHTML = '0';
        this.boardEl.appendChild(this.scoreEl);

        this.score = 0;
    }

    clean() {
        while (this.boardEl.lastChild) {
            this.boardEl.removeChild(this.boardEl.lastChild);
        }
        this.score = 0;
        this.scoreEl.innerHTML = '0';
        this.boardEl.appendChild(this.scoreEl);
    }

    addCard(card) {
        this.boardEl.appendChild(card.domEl);
        //card.illuminate();

        this.score += card.score;
        this.scoreEl.innerHTML = this.score;
    }
}
