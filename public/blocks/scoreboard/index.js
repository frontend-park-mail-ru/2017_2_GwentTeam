
import Block from '../block/index.js';
//import {scoreboardTemplate} from "./scoreboard.pug.js";
'use strict';
// const compiledFunction = compileFile('scoreboard.pug');
// console.log(compiledFunction({
//     name: 'Timothy'
// }));

//const Block = window.Block;
//const ScoreboardTemplate = scoreboardTemplate;

class Scoreboard extends Block {
    constructor() {
        const el = document.createElement('table');
        super(el);
    }

    update(users = []) {
        this.clear();

        this.el.innerHTML = ({users});
    }
}
export default Scoreboard;
//window.Scoreboard = Scoreboard;

