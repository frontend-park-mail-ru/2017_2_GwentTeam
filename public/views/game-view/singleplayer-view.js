'use strict';

import './game.styl';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router.js';
import Deck from '../../game-components/deck/deck.js';
import SinglePlayerStrategy from '../../game-strategy/singleplayer.js';
import ButtonDeck from '../../game-components/btn-deck/btn-deck.js';

/**
* @module SinglePlayerView
* @extends BaseView
*/
export default class SinglePlayerView extends BaseView {
    constructor(parentElement) {
        //console.log(parentElement);
        const router = new Router();
        super(parentElement, router, true);
        this.router = router;
        //this.strategy = new SinglePlayerStrategy(this.router, this.el);
        //super.resume();

    }

    resume() {
        this.strategy = new SinglePlayerStrategy(this.router, this.el);
        super.resume();
    }

    pause() {
        this.strategy.destroy();
        this.strategy = null;
        super.pause();
    }
}
