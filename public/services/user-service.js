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
    signup(email, password) {
        Http.Post('/signup', {email, password});
    }

    /**
     * Авторизация пользователя
     * @param {string} email
     * @param {string} password
     * @param {Function} callback
     */
    login(email, password) {
        Http.Post('/login', {email, password});
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
    getData(force = false) {
      if (this.isLoggedIn() && !force) {
				return Promise.resolve(this.user);
			}

			return Http.Get('/me')
				.then(function (userdata) {
					this.user = userdata;
					return userdata;
				}.bind(this));

    }

    /**
     * Загружает список всех пользователей
     * @param callback
     */
    loadUsersList(callback) {
      return Http.Get('/users')
      .then(function (users) {
        this.users = users;

        if (this.isLoggedIn()) {
          this.users = this.users.map(function (user) {
            user.me = user.email === this.user.email;
            return user;
          }.bind(this));
        }

        return this.users;
      }.bind(this));
    }
}

export default UserService;
//window.UserService = UserService;

//})();
