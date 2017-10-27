'use strict';

import './menu.css';
import UserService from '../../services/user-service.js';
import BaseView from '../../modules/view.js';
import menuTemplate from './menu.pug';
import bus from '../../modules/event-bus.js';

const userService = new UserService();

/**
* Класс MenuView
* @module MenuView
* @extends BaseView
*/
export default class MenuView extends BaseView {
    start() {
        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.user = data.payload;
            this.resume();
        }).bind(this));
        bus.on('user:unauthorized', (() => {
            this.user = null;
            this.resume();
        }).bind(this));
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
