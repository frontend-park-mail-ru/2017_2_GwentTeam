'use strict';

import './signup.css';
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
        validate(this.form.el, document.querySelector('.signup-form-js'));
        this.check();
        this.form.onsubmit(((formdata) => {
            bus.emit('signup-user', formdata);
        }).bind(this));
        bus.on('user:authorized', (() => {
            this.form.reset();
        }).bind(this));

        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.user = data.payload;
            this.resume();
        }).bind(this));
        bus.on('user:unauthorized', (() => {
            this.user = null;
        }).bind(this));
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

    check() {
        document.querySelector('.form-check').addEventListener('mouseover', (event) => {
            event.preventDefault();
            //if (event.target === document.querySelector('.form-check'))
            document.getElementById('Signup').setAttribute('type', 'text');
        });
        document.querySelector('.form-check').addEventListener('mouseout', (event) => {
            event.preventDefault();
            //if (event.target === document.querySelector('.form-check'))
            document.getElementById('Signup').setAttribute('type', 'password');
        });
    }
}
