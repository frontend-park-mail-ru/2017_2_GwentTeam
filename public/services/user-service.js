'use strict';

//const Http = window.Http;
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
     * @param {string} email
     * @param {string} password
     * @param {Function} callback
     */
    signup(login, email, password, callback) {
        Http.Post(url + '/join', {login, email, password}, callback);
    }

    /**
     * Авторизация пользователя
     * @param {string} email
     * @param {string} password
     * @param {Function} callback
     */
    login(email, password, callback) {
        Http.Post(url + '/auth', {email, password}, callback);
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
     * @param {Function} callback
     * @param {boolean} [force=false] - игнорировать ли кэш?
     */
    getData(callback, force = false) {
        if (this.isLoggedIn() && !force) {
            return callback(null, this.user);
        }

        Http.Get(url + '/auth', function (err, userdata) {
            if (err) {
                return callback(err, userdata);
            }

            this.user = userdata;
            callback(null, userdata);
        }.bind(this));
    }

    /**
     * Загружает список всех пользователей
     * @param callback
     */
    loadUsersList(callback) {
        Http.Get(url + '/users', function (err, users) {
            if (err) {
                return callback(err, users);
            }

            this.users = users;

            if (this.isLoggedIn()) {
                this.users = this.users.map(user => {
                    if (user.email === this.user.email) {
                        user.me = true;
                    }
                    return user;
                });
            }

            callback(null, this.users);
        }.bind(this));
    }
}

export default UserService;
