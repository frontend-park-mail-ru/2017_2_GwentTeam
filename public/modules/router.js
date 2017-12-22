'use strict';

import bus from './event-bus.js';
/**
* Роутер
* @module Router
*/
export default class Router {
    /**
    * @param {HTMLElement} rootElement
    * @param {HTMLElement} [viewContainer]
    * @constructor
    */
    constructor(rootElement, viewContainer) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.rootElement = rootElement;
        this.viewContainer = viewContainer || rootElement;
        this.currentView = null;
        this.routes = [];

        Router.__instance = this;

        this.callbacks = [];

        this.started = false;
        bus.on('router:start', () => {
            this.started = true;
            this.start();
        });
    }

    /**
    * Зарегистрировать новый route
    * @param {string} route - адрес
    * @param {BaseView} View
    * @return {Router}
    */
    register(route, View) {
        this.routes.push({
            route: route,
            View: View,
            view: null,
        });
        return this;
    }

    /**
    * Запустить роутер
    */
    start() {
        window.onpopstate = (() => {
            this.go(window.location.pathname);
        });
        this.rootElement.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'input') {
                return;
            }
            if (event.target.tagName.toLowerCase() === 'button') {
                if (event.target.hasAttribute('href')) {
                    const pathname = event.target.getAttribute('href');
                    this.go(pathname);
                }
                return;
            }
            if (event.target.className === 'app__logo') {
                this.go('/');
            }

            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);

        });
        this.go(window.location.pathname);
    }

    go(route) {
        if (this.started) {
            this.go_(route);
        }
    }

    /**
    * Перейти на страницу
    * @param {string} route - адрес
    */
    go_(route) {
        const res = this.routes.find((info) => {
            // идет по массиву, если pathname не равен текущему индексу сбрасывает значение и идет дальше
            if (route !== info.route) {
                return false;
            }

            if (window.location.pathname !== info.route) {
                window.history.pushState({}, '', info.route);
            }

            // null только при первой загрузки страницы, потому что ничего перезагружать не надо
            if (this.currentView) {
                this.currentView.pause();
            }
            if (window.location.pathname !== info.route) {
                return true;
            }

            if (!info.view) {
                info.view = new info.View(this.viewContainer, this);

            }
            info.view.start();
            this.currentView = info.view;

            info.view.resume();

            return true;
        });

        if (res) {
            this.callbacks.forEach((callback) => {
                callback(route);
            });
        }
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }
}
