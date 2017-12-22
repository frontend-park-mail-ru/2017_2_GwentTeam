'use strict';

import './signin.styl';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
import signinTemplate from './signin.pug';
import Validate from '../../modules/validate.js';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';

const userService = new UserService();

/**
 * Класс SigninView
 * @module SigninView
 * @extends BaseView
 */
export default class SigninView extends BaseView {
    start() {
        this.render();
        this.form = new Form(this.el.querySelector('.signin-form-js'), ['login', 'password']);
        this.validator = new Validate(this.form.el, document.querySelector('.signin-form-js'));
        this.validator.currentHandlers();
        this.form.onsubmit((formdata) => {
            this.validator.analize();
            if (this.validator.fieldsIsCorrect() === true){
                bus.emit('signin-user', formdata);
            }

        });

        bus.on('user:authorized', () => {
            this.form.reset();
        });
        bus.on('user:unrealdata', (() => {
            this.validator.unrealData();
        }));
        this.user = null;
        bus.on('user:authorized', (data) => {
            this.user = data.payload;
            this.resume();
        });
        bus.on('user:unauthorized', () => {
            this.user = null;
        });
        this.resume();
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
