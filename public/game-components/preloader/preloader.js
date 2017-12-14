'use strict';

import './preloader.styl';

export default class Preloader {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'game-view__preloader');
        this.el.innerHTML = 'Waiting for opponent...';
    }

    show() {
        this.el.setAttribute('hidden', 'hidden');
    }

    hide() {
        this.el.setAttribute('hidden', '');
    }
}
