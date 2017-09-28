'use strict';

import Block from '../block/index.js';

const ScoreboardTemplate = window.scoreboardTemplate;

class Scoreboard extends Block {
    constructor() {
        const el = document.createElement('table');
        super(el);
    }

    update(users = []) {
        this.clear();

        this.el.innerHTML = ScoreboardTemplate({users});
    }
}

export default Scoreboard;
