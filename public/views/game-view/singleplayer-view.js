'use strict';

import './game.styl';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router.js';
import SinglePlayerStrategy from '../../game-strategy/singleplayer.js';

/**
* @module GameView
* @extends BaseView
*/
export default class GameView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);

        //console.log(document.documentElement.clientHeight);
        if(document.documentElement.clientHeight < 500) {
            let viewport = document.querySelector("meta[name=viewport]");
            //console.log(viewport);
            viewport.setAttribute('content', 'width=device-width, initial-scale=0.6');
        }

        this.strategy = new SinglePlayerStrategy(router, this.el);
    }
}
