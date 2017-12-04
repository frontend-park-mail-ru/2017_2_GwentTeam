'use strict';

import './btn-pass.styl';

export default class ButtonPass {
    /**
     * @constructor
     */
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'profilefield__btn-pass');
        this.el.setAttribute('value', 'ПАС');
        this.el.innerText = 'ПАС';

        this.availible = true;
    }
}
