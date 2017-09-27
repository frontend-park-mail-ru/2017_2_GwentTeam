//(function () {
'use strict';

//const Http = window.Http;
import Http from '../modules/http.js'

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
    signup(email, password, callback) {
        Http.Post('/signup', {email, password}, callback);
    }

    /**
     * Авторизация пользователя
     * @param {string} email
     * @param {string} password
     * @param {Function} callback
     */
    login(email, password, callback) {
        Http.Post('/login', {email, password}, callback);
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

        Http.Get('/me', function (err, userdata) {
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
        Http.Get('/users', function (err, users) {
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
//window.UserService = UserService;

//})();
