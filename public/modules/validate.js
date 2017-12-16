'use strict';

const DEFAULT_INFO = 'Must be more than 4 symbols';
const TOO_SHORT_INFO = 'Too short!';
const INVALID_EMAIL_INFO = 'Not valid email formal!';
const REQUIRED_INFO = 'Required field!';
const DONE_INFO = 'Done!';
const YES_COLOR = '#32cd32';
const NO_COLOR = 'lightcoral';
const UP = 'up';
const IN = 'in';

export default class Validate {
    constructor(form, selector) {
        this.form = form;
        if (selector === document.querySelector('.signin-form-js')) {
            this.flag = IN;
            this.password = document.getElementById('Signin');
            this.login = document.getElementById('InInput');
        } else {
            this.flag = UP;
            this.password = document.getElementById('Signup');
            this.infoEmail = this.form.querySelector('.email-validate');
            this.login = document.getElementById('UpInput');
            this.changeInfo(this.infoEmail, null);
            this.email = document.getElementsByName('email');
        }
        this.resUp = {
            login: true,
            password: false,
            email: true
        };
        this.resIn = {
            login: true,
            password: false,
        };
        this.eye = document.querySelector('.form-check');


        if (this.eye !== null) {
            this.eye.addEventListener('mouseover', () => {
                this.password.setAttribute('type', 'text');
            });

            this.eye.addEventListener('mouseout', () => {
                this.password.setAttribute('type', 'password');
            });
        }

        this.infoPassword = this.form.querySelector('.password-validate');
        this.infoEmail = this.form.querySelector('.email-validate');
        this.infoLogin = this.form.querySelector('.login-validate');
        this.changeInfo(this.infoPassword, DEFAULT_INFO);


        this.err = this.form.querySelector('.info-text');

    }

    changeInfo(info, mes) {//сделать для других полей
        info.innerHTML = mes;
    }

    changeColor(info, color) {
        info.parentElement.style.borderColor = color;
        info.style.color = color;
    }

    fieldsIsCorrect() {
        if (this.flag === UP) {
            this.resultable = Object.values(this.resUp).every(element => element === true);
            return this.resultable;
        } else {
            this.resultable = Object.values(this.resIn).every(element => element === true);
            return this.resultable;
        }
    }
    // printErrors(error) {
    //
    // }

    currentHandlers() {
        this.resX = null;
        this.form.addEventListener('input', (event) => {
            if (this.flag === UP) {
                this.resX = this.resUp;
                if (event.target === this.email[0] && !this.email[0].value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
                    this.changeColor(this.infoEmail, NO_COLOR);
                    this.changeInfo(this.infoEmail, INVALID_EMAIL_INFO);
                    this.resX.email = false;
                }

                if (event.target === this.email[0] && this.email[0].value.length === 0) {
                    this.changeColor(this.infoEmail, NO_COLOR);
                    this.changeInfo(this.infoEmail, REQUIRED_INFO);
                    this.resX.email = false;
                }

                if (event.target === this.email[0] && this.email[0].value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
                    this.changeColor(this.infoEmail, YES_COLOR);
                    this.changeInfo(this.infoEmail, DONE_INFO);
                    this.resX.email = true;

                }
            } else {
                this.resX = this.resIn;
            }
            if (event.target === this.password && this.password.value.length < 4) {
                this.changeColor(this.infoPassword, NO_COLOR);
                this.changeInfo(this.infoPassword, TOO_SHORT_INFO);
                this.resX.password = false;
            }
            if (event.target === this.password && this.password.value.length === 0) {
                this.changeColor(this.infoPassword, NO_COLOR);
                this.changeInfo(this.infoPassword, REQUIRED_INFO);
                this.resX.password = false;
            }
            if (event.target === this.password && this.password.value.length >= 4) {
                this.changeColor(this.infoPassword, YES_COLOR);
                this.changeInfo(this.infoPassword, DONE_INFO);
                this.resX.password = true;
            }
            //if (event.target === this.login && this.login.value)
        });
    }

    analize() {
        if (this.flag === UP) {
            if (this.email[0].value.length === 0) {//TODO заменить блок в функцию
                this.changeColor(this.infoEmail, NO_COLOR);
                this.changeInfo(this.infoEmail, REQUIRED_INFO);
                this.resX.email = false;
            }
        }
        if (this.login.value.length === 0) {
            this.changeColor(this.infoLogin, NO_COLOR);
            this.changeInfo(this.infoLogin, REQUIRED_INFO);
            this.resX.login = false;
        }
        if (this.password.value.length === 0) {
            this.changeColor(this.infoPassword, NO_COLOR);
            this.changeInfo(this.infoPassword, REQUIRED_INFO);
            this.resX.password = false;
        }
    }

}
