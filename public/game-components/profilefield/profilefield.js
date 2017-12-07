'use strict';

import './profilefield.styl';

export default class Profilefield {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view__profilefield');
    }

    addEl(element) {
         this.el.appendChild(element.el);
    }
}
