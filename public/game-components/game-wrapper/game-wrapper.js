'use strict';

import './game-wrapper.styl';

export default class GameWrapper {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view');
    }

    addEl(element) {
         this.el.appendChild(element.el);
    }
}
