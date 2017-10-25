'use strict';

import BaseView from '../../modules/view.js';
//import UserService from '../../services/user-service.js';
//const userService = new UserService();

export default class SignoutView extends BaseView {
    start() {
        this.user = null;
        //userService.logout();
        // this.resume();
    }

    resume() {
        this.bus.emit('signout-user', this.user);
        if (this.user === null) {
            console.log('ura', this.user);
            this.router.go('/');
            //return;
        }
    }
}
