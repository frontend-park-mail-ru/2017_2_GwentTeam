'use strict';

import './card.styl';

export default class Card {
    /**
     * @constructor
     */
    constructor(score, type, index) {
        this.score = score;
        this.type = type;
        this.index = index;
    }
}
