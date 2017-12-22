'use strict';

import './game.styl';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router.js';
import SinglePlayerStrategy from '../../game-strategy/singleplayer.js';

/**
* @module SinglePlayerView
* @extends BaseView
*/
export default class GameView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);
        this.router = router;
        this.Strategy = SinglePlayerStrategy;
    }

    resume() {
        this.strategy = new this.Strategy(this.router, this.el);
        super.resume();
    }

    pause() {
        this.strategy.destroy();
        this.strategy = null;
        super.pause();
    }
}
