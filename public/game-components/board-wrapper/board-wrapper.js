'use strict';

import './board-wrapper.styl';

export default class BoardWrapper {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view__game-board');
    }

    addEl(element) {
        this.el.appendChild(element.el);
    }
}
