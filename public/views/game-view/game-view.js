'use strict';

import './game.styl';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router.js';
import MultiPlayerStrategy from '../../game-strategy/multiplayer.js';

/**
* @module GameView
* @extends BaseView
*/

export default class GameView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);

        this.strategy = new MultiPlayerStrategy(router, this.el);
        super.resume();
    }
}
