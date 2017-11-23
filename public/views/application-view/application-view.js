'use strict';

import './application.styl';
import BaseView from '../../modules/view.js';
import applicationTemplate from './application.pug';

/**
 * Класс ApplicationView
 * @module ApplicationView
 * @extends BaseView
 */
export default class ApplicationView extends BaseView {
    /**
     * @param {HTMLElement} parentElement
     * @constructor
     */
    constructor(parentElement) {
        super(parentElement, null, true);
        this.render();
        this.show();
    }

    render() {
        this.el.innerHTML = applicationTemplate({});
    }

    getElement() {
        return this.el;
    }

    getViewsContainerElement() {
        return this.el.querySelector('.application__views-js');
    }
}
