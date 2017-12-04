'use strict';

//import Block from '../../modules/block.js';
import './gameboard.styl';

//export default class GameBoard extends Block {
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

    addCard(elem) {
        this.el.appendChild(elem);
    }
}
