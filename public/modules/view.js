'use strict';

//import EventBus from './event-bus.js';
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
        const name = this.constructor.name.slice(0, -4).toLowerCase() || `view-${count++}`;
        this.el = document.createElement('section');
        this.el.setAttribute('data-view', name);
        if (!root) {
            this.el.classList.add('application__view', `application__${name}-view`);
        }
        //this.bus = new EventBus();
        this.router = router;
        this.pause();
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
