'use strict';

let count = 0;

/**
 * Модуль базовой View
 * @module BaseView
 */
export default class BaseView {
    /**
     *
     * @param {HTMLElement} parentElement
     * @param {Router} router
     * @param {boolean} [root=false]
     */
    constructor(parentElement, router, root) {
        if(document.documentElement.clientWidth < 600) { //TODO
            let viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=0.4');
        }
        else if(document.documentElement.clientWidth < 700) {
            let viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=0.5');
        }
        else if(document.documentElement.clientWidth < 800) {
            let viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=0.6');
        }

        const name = this.constructor.name.slice(0, -4).toLowerCase() || `view-${count++}`;
        this.el = document.createElement('section');
        this.el.setAttribute('data-view', name);
        this.el.setAttribute('class', name);
        if (!root) {
            this.el.classList.add('application__view', `application__${name}-view`);
        }
        this.router = router;
        parentElement.appendChild(this.el);
    }

    render() {
    }

    start() {
        this.render();
    }

    destroy() {
    }

    resume() {
        this.show();
    }

    pause() {
        this.hide();
    }

    hide() {
        this.el.setAttribute('hidden', 'hidden');
    }

    show() {
        this.el.removeAttribute('hidden');
    }
}
