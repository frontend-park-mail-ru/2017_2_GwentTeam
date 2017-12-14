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

    hide() {
        this.el.innerHTML = '';
    }

    illuminate() {
        this.el.setAttribute('class', 'game-view__preloader__illuminate');
    }

    hideIlluminate() {
        this.el.setAttribute('class', 'game-view__preloade');
    }
}
