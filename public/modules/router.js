'use strict';

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
        window.onpopstate = function (e) {
            this.go(window.location.pathname);
        }.bind(this);
        this.rootElement.addEventListener('click', function (event) {
            if (event.target.tagName.toLowerCase() === 'input')
            {
                // if (event.target.hasAttribute('href')) {
                //     const pathname = event.target.getAttribute('href');
                //     this.go(pathname);
                //     console.log('ku');
                // }
                return;
            }
            if (event.target.tagName.toLowerCase() === 'button') {
                if (event.target.hasAttribute('href')) {
                    const pathname = event.target.getAttribute('href');
                    this.go(pathname);
                    console.log('ku');
                }
                return;
            }
            if (event.target.className === 'app__logo') {
                this.go('/');
            }

            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);

        }.bind(this));
        this.go(window.location.pathname);
    }

    /**
     * Перейти на страницу
     * @param {string} route - адрес
     */
    go(route) {
        this.routes.find(function (info) {
            if (route !== info.route) {//идет по массиву, если pathname не равен текущему индексу сбрасывает значение и идет даль
                return false;
            }

            if (window.location.pathname !== info.route) {
                window.history.pushState({}, '', info.route);
            }

            if (this.currentView) {//null только при первой загрузки страницы, потмоу что ничего перезагружать не надо
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
        }.bind(this));
    }
}
