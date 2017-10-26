'use strict';

import './menu.css';
// const BaseView = modules.BaseView;
// const userService = new modules.services.UserService();
import UserService from '../../services/user-service.js';
import BaseView from '../../modules/view.js';
const userService = new UserService();
import menuTemplate from './menu.pug';
import bus from '../../modules/event-bus.js';
//const views = modules.views = modules.views || Object.create(null);

/**
 * Класс MenuView
 * @module MenuView
 * @extends BaseView
 */
export default class MenuView extends BaseView {
    start() {
        this.user = null;
        bus.on('user:authorized', function (data) {
            this.user = data.payload;
            this.resume();
        }.bind(this));
        bus.on('user:unauthorized', function() {       // (data) {
            this.user = null;
            this.resume();
        }.bind(this));
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
