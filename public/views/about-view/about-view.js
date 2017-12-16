'use strict';

import BaseView from '../../modules/view.js';
import aboutTemplate from './about.pug';
import './about.styl';

/**
 * Класс AboutView
 * @module AboutView
 * @extends BaseView
 */
export default class AboutView extends BaseView {
    start() {
        this.render();
        super.resume();
    }

    render() {
        this.el.innerHTML = aboutTemplate({});
    }
}
