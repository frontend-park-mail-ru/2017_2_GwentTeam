'use strict';

import BaseView from '../../modules/view.js';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';

export default class SignoutView extends BaseView {
    start() {
        this.loader = new Loader();
        this.user = null;
    }

    resume() {
        bus.emit('signout-user', this.user);
        if (this.user === null) {
            this.router.go('/');
        }
    }
}
