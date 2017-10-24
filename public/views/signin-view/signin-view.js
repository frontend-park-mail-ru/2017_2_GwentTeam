'use strict';

import './signin.css';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
const userService = new UserService();
import signinTemplate from './signin.pug';

/**
 * Класс SigninView
 * @module SigninView
 * @extends BaseView
 */
export default class SigninView extends BaseView {
    start() {
        this.render();
        this.form = new Form(this.el.querySelector('.signin-form-js'), ['login', 'password']);
        this.form.onsubmit(function (formdata) {
            this.bus.emit('signin-user', formdata);
        }.bind(this));
        this.bus.on('user:authorized', function () {
            this.form.reset();
        }.bind(this));

        this.user = null;
        this.bus.on('user:authorized', function (data) {
            this.user = data.payload;
            this.resume();
        }.bind(this));
        this.bus.on('user:unauthorized', function (data) {
            this.user = null;
           // this.resume();
        }.bind(this));
    }

    render() {
        this.el.innerHTML = signinTemplate({});
    }

    resume() {
        if (userService.isLoggedIn()) {
            this.user = userService.user;
        }
        if (this.user !== null) {
            this.router.go('/');
            return;
        }
        super.resume();
    }
}
