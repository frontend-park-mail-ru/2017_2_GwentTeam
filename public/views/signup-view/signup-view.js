'use strict';

import './signup.styl';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
import signupTemplate from './signup.pug';
import bus from '../../modules/event-bus.js';
import Validate from '../../modules/validate.js';

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
        this.validator = new Validate(this.form.el, document.querySelector('.signup-form-js'));
        this.validator.currentHandlers();
        this.form.onsubmit(((formdata) => {
            this.validator.analize();
            if (this.validator.fieldsIsCorrect() === true) {
                bus.emit('signup-user', formdata);
            }
        }));
        bus.on('user:authorized', (() => {
            this.form.reset();
        }));
        bus.on('user:alreadyis', (() => {
            this.validator.alreadyIs();
        }));

        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.user = data.payload;
            this.resume();
        }));
        bus.on('user:unauthorized', (() => {
            this.user = null;
        }));
        this.resume();
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
