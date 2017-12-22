'use strict';

import GameView from './game-view.js';
import MultiPlayerStrategy from '../../game-strategy/multiplayer.js';

/**
* @module MultiPlayerView
* @extends GameView
*/

export default class MultiPlayerView extends GameView {
    constructor(parentElement) {
        super(parentElement);
        this.Strategy = MultiPlayerStrategy;
    }
}
