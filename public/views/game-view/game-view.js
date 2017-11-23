'use strict';

import './game.styl';
import BaseView from '../../modules/view.js';
import bus from '../../modules/event-bus.js';
import Router from '../../modules/router.js';
import SinglePlayerStrategy from './game-strategy/singleplayerNew.js';
import MultiPlayerStrategy from './game-strategy/multiplayer.js';

/**
* @module GameView
* @extends BaseView
*/
export default class GameView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);
        //this.strategy = new SinglePlayerStrategy(router, this.el);
        this.strategy = new MultiPlayerStrategy(router, this.el);
    }
}
