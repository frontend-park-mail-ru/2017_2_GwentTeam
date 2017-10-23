'use strict';

import BaseView from '../../modules/view.js';
const aboutTemplate = window.aboutTemplate;

/**
 * Класс AboutView
 * @module AboutView
 * @extends BaseView
 */
export default class AboutView extends BaseView {
    start() {
        this.render();
    }

    render() {
        this.el.innerHTML = aboutTemplate({});
    }
}

