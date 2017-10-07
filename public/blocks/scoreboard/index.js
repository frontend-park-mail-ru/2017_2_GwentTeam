'use strict';

import Block from '../block/index';
import ScoreboardTemplate from './scoreboard.pug';
import './index.css';

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
