'use strict';
import Block from '../block/index.js';

class Form extends Block {

    /**
    * @param {} fields - элементы формы
    * @constructor
    */
    constructor(fields = []) {
        super('form');
        fields.forEach((field) => {
            const f = new Block('input', field.attrs || {}, field.classes || []);
            this.append(f);
        });
    }

    /**
     *
     * @param {function} callback
     */
    onSubmit(callback) {
        this.el.addEventListener('submit', (e) => {
            e.preventDefault();
            const formdata = {};
            const elements = this.el.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        });
    }

    /**
     * Выполняет сброс формы
     */
    reset() {
        this.el.reset();
    }
}

export default Form;
