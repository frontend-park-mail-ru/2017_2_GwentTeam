'use strict';

import BaseView from '../../modules/view.js';
const gameTemplate = window.gameTemplate;

/**
 * Класс GameView
 * @module GameView
 * @extends BaseView
 */
export default class GameView extends BaseView {
    start() {
        this.render();
    }

    render() {
        this.el.innerHTML = gameTemplate({});
    }
}

