'use strict';

import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
const profileTemplate = window.profileTemplate;
const userService = new UserService();

/**
 * Класс ProfileView
 * @module ProfileView
 * @extends BaseView
 */
export default class ProfileView extends BaseView {
    start() {
        this.user = null;
        this.bus.on('user:authorized', function (data) {
            this.user = data.payload;
            this.render();
        }.bind(this));
        this.bus.on('user:unauthorized', function (data) {
            this.user = null;
            this.resume();
        }.bind(this));
    }

    render() {
        this.el.innerHTML = profileTemplate({user: this.user});
    }

    resume() {
        if (userService.isLoggedIn()) {
            this.user = userService.user;
        }
        if (this.user === null) {
            this.pause();
            this.router.go('/');
            return;
        }
        this.render();
        super.resume();
    }
}
