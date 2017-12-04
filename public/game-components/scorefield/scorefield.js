'use strict';

import './scorefield.styl';

export default class Scorefield {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'profilefield__score');
    }

    printScore(state) {
        this.el.innerHTML = 'Очков за раунд: ' + state.score +
            '<br/><br/>Выиграно раундов:  ' + state.rounds;
    }
}
