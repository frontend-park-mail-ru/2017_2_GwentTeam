'use strict';

import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
const userService = new UserService();
const signupTemplate = window.signupTemplate;

/**
 * Класс SignupView
 * @module SignupView
 * @extends BaseView
 */
export default class SignupView extends BaseView {
    start() {
        this.render();
        console.log(userService.user)
        this.form = new Form(this.el.querySelector('.signup-form-js'), ['login', 'email', 'password']);
        console.log(this.form)
        this.form.onSubmit(function (formdata) {
            console.log('sub')
            this.bus.emit('signup-user', formdata);
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
            this.resume();
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
            console.log('nonull',  this)
            this.router.go('/');
            return;
        }
        super.resume();
    }
}
