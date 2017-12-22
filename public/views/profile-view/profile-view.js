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
        // bus.on('user:notauthorized', () => {//добавить сюда go
        //     //this.resume();
        // });
        //userService.isLoggedIn();
        this.onAuthorized = (data) => {
            this.user = data.payload;
            //console.log('ren');
            //this.render();
            this.user = userService.user;
            this.render();

            this.resume();
            //super.resume();
        };
        this.onUnauthorized = () => {
            this.user = null;
            this.pause();
            this.router.go('/');
        };

        bus.on('user:authorized', this.onAuthorized);
        bus.on('user:unauthorized', this.onUnauthorized);
        //this.resume();
    }

    render() {
        this.el.innerHTML = profileTemplate({user: this.user});
    }

    resume() {
        //console.log('profile resume');
        if (!this.user) {
            if (userService.isLoggedIn()) {
                this.onAuthorized(userService.user);
            } else {
                return;
            }
        }

        // if (userService.isLoggedIn()) {
        //     this.user = userService.user;
        // }
        // if (this.user === null) {
        //     this.pause();
        //     this.router.go('/');
        //     return;
        // }
        // this.render();
        super.resume();
    }
}
