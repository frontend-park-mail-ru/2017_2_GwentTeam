'use strict';

import './profile.styl';
import BaseView from '../../modules/view.js';
import bus from '../../modules/event-bus.js';
import UserService from '../../services/user-service.js';
import profileTemplate from './profile.pug';

const userService = new UserService();
/**
 * Класс ProfileView
 * @module ProfileView
 * @extends BaseView
 */
export default class ProfileView extends BaseView {
    start() {
        this.user = null;
        bus.on('user:authorized', (data) => {
            this.user = data.payload;
            this.render();
        });
        bus.on('user:unauthorized', () => {
            this.user = null;
            this.resume();
        });
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
