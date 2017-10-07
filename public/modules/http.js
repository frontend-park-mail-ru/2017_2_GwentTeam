'use strict';

//const baseurl = `${window.location.protocol}//${window.location.host}`;

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
        //const url = (Http.BaseUrl || baseurl) + address;
        return fetch(address, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(function (response) {
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
        //const url = (Http.BaseUrl || baseurl) + address;
        return fetch(address, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        })
            .then(function (response) {
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
        //const url = (Http.BaseUrl || baseurl) + address;
        return fetch(address, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            // .then(function (response) {
            //     return {
            //         headers: response,
            //         json: response.json(),
            //     };
            // })
            .then(function (response) {
                if (response.status >= 400) {
                    throw response;
                }
                // let promise = new Promise((resolve, reject) =>
                //     resolve(response.json())
                // )
                // return promise.then((result) => result);
                //
                return Promise.all([
                    response,
                    response.json(),
                ]);
                // response.json();
            });
    }
}
//Http.BaseUrl = null;
