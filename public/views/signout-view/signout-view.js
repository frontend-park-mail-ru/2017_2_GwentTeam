'use strict';

import BaseView from '../../modules/view.js';
import bus from '../../modules/event-bus.js';

export default class SignoutView extends BaseView {
    start() {
        this.user = null;
        //this.resume();
    }

    resume() {
        bus.emit('signout-user', this.user);
        if (this.user === null) {
            this.router.go('/');
        }
    }
}
