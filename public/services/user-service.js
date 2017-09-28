'use strict';

import Http from '../modules/http.js';
const url = 'https://technogwent-api-010.herokuapp.com/api';
/**
 * Сервис для работы с юзерами
 * @module UserService
 */
class UserService {
    constructor() {
        this.user = null;
        this.users = [];
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} login
     * @param {string} email
     * @param {string} password
     */

    signup(login, email, password) {
        return Http.Post(url + '/join', {login, email, password});
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     */

    login(login, password) {
        return Http.Post(url + '/auth', {login, password});
    }
    /**
     * Логаут пользователя
     */
    logout() {
        return Http.Delete(url + '/auth');
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
            .then(function (userdata) {
                this.user = userdata;
                return userdata;
            }.bind(this));
    }

}

export default UserService;
