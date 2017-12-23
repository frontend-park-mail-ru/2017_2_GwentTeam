'use strict';

import Block from '../../modules/block.js';

export default class Form extends Block {

    /**
     * @param element
     * @param fields - элементы формы
     * @constructor
     */
    constructor(element, fields) {
        super(element);
        this.fields = fields;
    }

    /**
     *
     * @param {function} callback
     */
    onsubmit(callback) {
        this.el.addEventListener('submit',(event) => {
            event.preventDefault();
            const elements = this.el.elements;
            const formdata = Object.create(null);

            this.fields.forEach((field) => {
                formdata[field] = elements[field].value;
            });
            callback(formdata);
        });
        this.el.addEventListener('oninvalid', (e) => {
        });
    }

    /**
     * Выполняет сброс формы
     */
    reset() {
        this.el.reset();
    }
}
