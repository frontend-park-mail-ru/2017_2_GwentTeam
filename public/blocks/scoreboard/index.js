
import Block from '../block/index.js';
//import {scoreboardTemplate} from "./scoreboard.pug.js";
'use strict';

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


