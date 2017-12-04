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

    //TODO функцию очистки поля в конце игры
}
