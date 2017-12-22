'use strict';

import Http from '../modules/http.js';
import bus from '../modules/event-bus.js';
import Info from '../modules/info.js';
import Loader from '../modules/loader.js';

const url = 'https://technogwent-api-012.herokuapp.com/api';

/**
 * Сервис для работы с юзерами
 * @module UserService
 */
export default class UserService {
    constructor() {
        this.first = true;
        this.loader = new Loader();//
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
            this.loader.showEl();
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
        this.loader.showEl();
        return Http.Post(url + '/join', {login, email, password})
            .then((response) => {
                this.loader.hideEl();
                this.signin(login, password);
                return response;
            })
            .catch((err) => {
                if (err.status === 409) {
                    this.loader.hideEl();//
                    bus.emit('user:alreadyis', null);
                }
            });
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     */

    signin(login, password) {
        this.loader.showEl();
        return Http.Post(url + '/auth', {login, password})
            .then((response) => {
                this.loader.hideEl();
                this.getData(true);
                return response;
            })
            .catch((err) => {
                if (err.status === 403) {
                    this.loader.hideEl();//
                    bus.emit('user:unrealdata', null);
                }
            });
    }

    /**
     * Логаут пользователя
     */
    logout() {
        this.loader.showEl();
        return Http.Delete(url + '/auth')
            .then((response) => {
                this.user = null;
                bus.emit('user:unauthorized', this.user);
                this.loader.hideEl();//
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
        if (this.first === true) {
            this.first = false;
        } else {
            this.loader.showEl();
        }

        if (this.isLoggedIn() && !force) {
            return Promise.resolve(this.user);
        }

        return Http.Get(url + '/auth')
            .then((userdata) => {
                this.user = userdata;
                //console.log('&',this.user);
                bus.emit('user:authorized', this.user);
                this.loader.hideEl();//
                return userdata;
            })
            .catch((err) => {
                if (err.status === 401) {
                    this.loader.hideEl();
                }
                return err;
            });
    }

    getUsers(limit, offset) {
        this.loader.showEl();
        return Http.Get(url + `/users?limit=${limit}&offset=${offset}`)
            .then((res) => {
                bus.emit('users:fetch', res);
                this.loader.hideEl();
                return res;
            })
            .catch((err) => {
                this.loader.hideEl();
                return err;
            });
    }

    getUser(hasPosition) {
        this.loader.showEl();
        return Http.Get(url + `/auth?hasPosition=${hasPosition}`)
            .then((res) => {
                this.loader.hideEl();
                bus.emit('user:fetch', res);
                return res;
            })
            .catch((err) => {
                this.loader.hideEl();
                return err;
            });
    }

}
