'use strict';

import './signup.styl';
import BaseView from '../../modules/view.js';
import UserService from '../../services/user-service.js';
import Form from '../../blocks/form/form.js';
import signupTemplate from './signup.pug';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';
import Validate from '../../modules/validate.js';

const userService = new UserService();

/**
* Класс SignupView
* @module SignupView
* @extends BaseView
*/
export default class SignupView extends BaseView {
    start() {
        this.loader = new Loader();
        this.render();
        this.form = new Form(this.el.querySelector('.signup-form-js'), ['login', 'email', 'password']);
        this.validator = new Validate(this.form.el, document.querySelector('.signup-form-js'));
        this.validator.currentHandlers();
        bus.on('valid:err', (data) => {
            this.printErrors(data.payload);
        });
        this.form.onsubmit(((formdata) => {
            //
            this.validator.analize();
            if (this.validator.fieldsIsCorrect() === true)
                bus.emit('signup-user', formdata);
        }).bind(this));
        bus.on('user:authorized', (() => {
            //this.loader.hideEl();
            this.form.reset();
        }).bind(this));

        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.user = data.payload;
            this.resume();
        }).bind(this));
        bus.on('user:unauthorized', (() => {
            //this.loader.hideEl();
            this.user = null;
        }).bind(this));
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
