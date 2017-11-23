'use strict';

import './signup.styl';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
import signupTemplate from './signup.pug';
import bus from '../../modules/event-bus.js';
import {validate} from '../../modules/validate.js';

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
        validate(this.form.el);
        this.form.onsubmit(((formdata) => {
            this.back.style.display = 'flex';
            this.loader.style.display = 'flex';
            bus.emit('signup-user', formdata);
        }));
        bus.on('user:authorized', (() => {
            this.form.reset();
        }));

        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.user = data.payload;
            this.resume();
            this.back.style.display = 'none';
            this.loader.style.display = 'none';
        }));
        bus.on('user:unauthorized', (() => {
            this.user = null;
        }));
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
