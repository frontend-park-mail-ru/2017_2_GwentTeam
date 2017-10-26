'use strict';

/**
* Базовый класс блока
* @module Block
*/
export default class Block {
    /**
     * @param {HTMLElement} element - корневой элемент блока
     * @param options
     * @constructor
     */
    constructor(element, options) {
        options = options || {};
        this.el = element
            || document.createElement(options.tagName || 'div');
        this.el.classList.add.apply(this.el.classList, options.classList || []);
        const attrs = options.attrs || {};
        for (const attr in attrs) {
            this.el.setAttribute(attr, attrs[attr]);
        }
        if (options.textContent) {
            this.el.textContent = options.textContent;
        }
    }

    /**
     * Установить новый текст для блока
     * @param {string} text
     */
    setText(text) {
        this.el.textContent = text;
    }

    /**
     * Очищает содержимое блока
     */
    clear() {
        this.el.innerHTML = '';
    }

    /**
     * Скрывает блок
     */
    hide() {
        this.el.setAttribute('hidden', 'hidden');
    }

    /**
     * Отображает блок
     */
    show() {
        this.el.removeAttribute('hidden');
    }

    /**
     * Позволяет подписаться на событие
     * @param {string} event
     * @param {EventListener} callback
     * @return {function(this:Block)} - функция отписки от события
     */
    on(event, callback) {
        this.el.addEventListener(event, callback);
        return function () {
            this.el.removeEventListener(event, callback);
        }.bind(this);
    }
}
