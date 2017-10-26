'use strict';

import Http from '../modules/http.js';
import bus from '../modules/event-bus.js';
const url = 'https://technogwent-api-010.herokuapp.com/api';
/**
 * Сервис для работы с юзерами
 * @module UserService
 */
export default class UserService {
    constructor() {
        if (UserService.__instance) {
            return UserService.__instance;
        }
        this.user = null;
        this.users = [];
        bus.on('signup-user', function (data) {
            const user = data.payload;
            this.signup(user.login, user.email, user.password);
        }.bind(this));
        bus.on('signin-user', function (data) {
            const user = data.payload;
            this.signin(user.login, user.password);
        }.bind(this));
        bus.on('signout-user', function (data) {
            this.logout();
        }.bind(this));

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
            .then(function(response) {
                this.signin(login, password);
                return response;
            }.bind(this));
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     */

    signin(login, password) {
        return Http.Post(url + '/auth', {login, password})
            .then(function (response) {
                this.getData(true);
                return response;
            }.bind(this));
    }
    /**
     * Логаут пользователя
     */
    logout() {
        return Http.Delete(url + '/auth')
            .then(function (response) {
                this.user = null;
                bus.emit('user:unauthorized', this.user);
                return response;
            }.bind(this));
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
            .then(function(userdata) {
                this.user = userdata;
                bus.emit('user:authorized', this.user);
                return userdata;
            }.bind(this));
    }

}
