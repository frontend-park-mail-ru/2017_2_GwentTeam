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
        console.log('name', this.constructor.name)
        const name = this.constructor.name.slice(0, -4).toLowerCase() || `view-${count++}`;
        this.el = document.createElement('section');
        this.el.setAttribute('data-view', name);     //TODO remove
        this.el.setAttribute('class', name);
        if (!root) {
            this.el.classList.add('application__view', `application__${name}-view`);
        }
        this.router = router;
        this.pause();
        parentElement.appendChild(this.el);

        this.loader = document.createElement('div');
        this.loader.setAttribute('class', 'loader');
        this.back = document.createElement('div');
        this.back.setAttribute('class', 'background-loader');
        document.body.appendChild(this.back);
        this.back.appendChild(this.loader);
        this.back.style.display = 'none';
        this.loader.style.display = 'none';
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
