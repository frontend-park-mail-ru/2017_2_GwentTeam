'use strict';
import bus from './event-bus.js';


let routStarted = false;
/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */
export default class Http {
    /**
     * Выполняет GET-запрос по указанному адресу
     * @param {string} address - адрес запроса
     */
    static Get(address) {
        return fetch(address, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then((response) => {
            if (!routStarted) {
                bus.emit('router:start');
                routStarted = true;
            }
            if (response.status >= 400) {
                throw response;
            }
            return response.json();
        });
    }

    /**
     * Выполняет DELETE-запрос по указанному адресу
     * @param {string} address - адрес запроса
     */
    static Delete(address) {
        return fetch(address, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }
                return response.json();
            });
    }


    /**
     * Выполняет POST-запрос по указанному адресу
     * @param {string} address - адрес запроса
     * @param {*} body - тело запроса (объект)
     */
    static Post(address, body) {
        return fetch(address, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}
