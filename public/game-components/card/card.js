'use strict';

import './card.styl';

export default class Card {
    /**
     * @constructor
     */
    constructor(data) {
        this.score = data.score;
        this.type = data.type;
        this.index = data.index;
        this.domEl = this.createImg();
    }

    createImg() {
        const src = './img/new-cards/' + this.index + '.png';
        let domEl = document.createElement('img');
        domEl.setAttribute('src', src);
        domEl.setAttribute('class', 'cardfield__card-img');
        return domEl;
    }

    deleteImg() {
        this.domEl.remove();
    }
}
