'use strict';

import Http from '../modules/http.js';
import bus from '../modules/event-bus.js';
import Info from  '../modules/info.js';

const url = 'https://technogwent-api-011.herokuapp.com/api';

/**
 * Сервис для работы с юзерами
 * @module UserService
 */
export default class UserService {
    constructor() {
        this.result = new Info();
        if (UserService.__instance) {
            return UserService.__instance;
        }
        this.user = null;
        bus.on('signup-user', ((data) => {
            const user = data.payload;
            this.signup(user.login, user.email, user.password);
        }));
        bus.on('signin-user', ((data) => {
            const user = data.payload;
            this.signin(user.login, user.password);
        }));
        bus.on('signout-user', (() => {
            this.logout();
        }));

        UserService.__instance = this;
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} login
     * @param {string} email
     * @param {string} password
     */

    signup(login, email, password) {
        return Http.Post(url + '/join', {login, email, password})
            .then((response) => {
                this.signin(login, password);
                return response;
            })
            .catch((err) => {
                if (err.status === 409) {
                    // err.json().then((obj) => {
                    //     console.log(obj.message);
                    // });
                    this.result.turnonInfo('Пользователь уже существует :(');
                }
            });
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     */

    signin(login, password) {
        return Http.Post(url + '/auth', {login, password})
            .then((response) => {
                this.getData(true);
                return response;
            })
            .catch((err) => {
                if (err.status === 403) {
                    this.result.turnonInfo('Неверные данные :(');
                }
            });
    }
    /**
     * Логаут пользователя
     */
    logout() {
        return Http.Delete(url + '/auth')
            .then((response) => {
                this.user = null;
                bus.emit('user:unauthorized', this.user);
                return response;
            });
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return !!this.user;
    }

    /**
     * Загружает данные о текущем пользователе
     * @param {boolean} [force=false] - игнорировать ли кэш?
     */
    getData(force = false) {

        if (this.isLoggedIn() && !force) {
            return Promise.resolve(this.user);
        }

        return Http.Get(url + '/auth')
            .then((userdata) => {
                console.warn(userdata);
                this.user = userdata;
                bus.emit('user:authorized', this.user);
                return userdata;
            });
    }

    getUsers(limit, offset) {
        return Http.Get(url + `/users?limit=${limit}&offset=${offset}`)
            .then((res) =>{
                console.warn('res', res);
                return res;
            });
    }

    getUser() {
        return Http.Get(url + '/user');
    }

}
