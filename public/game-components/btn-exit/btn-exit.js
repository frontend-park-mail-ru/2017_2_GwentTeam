'use strict';

import './btn-exit.styl';

export default class ButtonExit {
    /**
     * @constructor
     */
    constructor(router) {
        this.router = router;

        this.el = document.createElement('div');
        this.el.setAttribute('class', 'profilefield__btn-exit');
        this.el.innerHTML = 'Exit';

        // this.el.onclick = () => {
        //     this.router.go('/');
        // };
    }
}
