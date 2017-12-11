'use strict';

const DEFAULT_INFO = 'Must be more than 4 symbols';
const TOO_SHORT_INFO = 'Too short!';
const DONE_INFO = 'Done!';
const YES_COLOR = '#32cd32';
const NO_COLOR = 'lightcoral';
const UP = 'up';
const IN = 'in';

export default class Validate {
    constructor(form, selector) {
        //this.res = true;
        this.form = form;
        if (selector === document.querySelector('.signin-form-js')) {
            this.flag = IN;
            this.password = document.getElementById('Signin');
        } else {
            this.flag = UP;
            this.password = document.getElementById('Signup');
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

        this.info = this.form.querySelector('.password-validate');
        this.changeInfo(DEFAULT_INFO);

        this.login = document.getElementsByName('login');
        this.err = this.form.querySelector('.info-text');

    }

    changeInfo(mes) {//сделать для других полей
        this.info.innerHTML = mes;
    }

    changeColor(color) {
        this.info.parentElement.style.borderColor = color;
        this.info.style.color = color;
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
    printErrors(error) {

    }

    currentHandlers() {
        this.form.addEventListener('input', (event) => {
            event.preventDefault();
            if (event.target === this.password && this.password.value.length < 4) {
                this.changeColor(NO_COLOR);
                this.changeInfo(TOO_SHORT_INFO);
                this.resUp.password = false;
            }
            if (event.target === this.password && this.password.value.length >= 4) {
                this.changeColor(YES_COLOR);
                this.changeInfo(DONE_INFO);
                this.resUp.password = true;
            }
        });
    }

    analize() {
    //     if (this.email) {
    //         if (this.login.value.length > 0) {
    //             this.res *= true;
    //         } else {
    //             this.res *= false;
    //             this.errors += 'Too short login!';
    //         }
    //         if (this.email.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')) {
    //             this.res *= true;
    //         } else {
    //             this.res *= false;
    //             this.errors += 'Not valid email!';
    //         }
    //         if (this.password.value.match('^\\S{4,}$')) {
    //             this.res *= true;
    //         } else {
    //             this.res *= false;
    //             this.errors += 'Not valid password!';
    //         }
    //     } else {
    //         if (this.login.value.length > 0
    //             && (this.password.value.match('^\\S{4,}$'))) {
    //
    //         }
    //     }
    }

}
