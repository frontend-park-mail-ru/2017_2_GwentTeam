'use strict';

import './menu.styl';
import UserService from '../../services/user-service.js';
import BaseView from '../../modules/view.js';
import menuTemplate from './menu.pug';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';

const userService = new UserService();

/**
* Класс MenuView
* @module MenuView
* @extends BaseView
*/
export default class MenuView extends BaseView {
    start() {
        this.loader = new Loader();
        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.loader.hideEl();
            this.user = data.payload;
            this.resume();
        }));
        bus.on('user:unauthorized', (() => {
            this.loader.hideEl();
            this.user = null;
            this.resume();
        }));
        this.resume();
    }

    render() {
        const data = {
            authorized: this.user !== null,
        };
        this.el.innerHTML = menuTemplate(data);
    }

    resume() {
        if (userService.isLoggedIn()) {
            this.user = userService.user;
        }
        this.render();
        super.resume();
    }
}
