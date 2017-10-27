'use strict';

import './signup.css';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
import signupTemplate from './signup.pug';
import bus from '../../modules/event-bus.js';

const userService = new UserService();

/**
* Класс SignupView
* @module SignupView
* @extends BaseView
*/
export default class SignupView extends BaseView {
    start() {
        this.render();
        this.form = new Form(this.el.querySelector('.signup-form-js'), ['login', 'email', 'password']);
        this.form.onsubmit(function signup(formdata) {
            bus.emit('signup-user', formdata);
        }.bind(this));
        bus.on('user:authorized', function () {
            this.form.reset();
        }.bind(this));

        this.user = null;
        bus.on('user:authorized', function (data) {
            this.user = data.payload;
            this.resume();
        }.bind(this));
        bus.on('user:unauthorized', function () {
            this.user = null;
        }.bind(this));
    }

    render() {
        this.el.innerHTML = signupTemplate({});
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
