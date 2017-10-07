'use strict';
import Block from '../block/index.js';

class Form extends Block {

    /**
    * @param {} fields - элементы формы
    * @constructor
    */
    constructor(fields = []) {
        const el = document.createElement('form');
        console.log(el);
        super(el);
        console.log(el);
        fields.forEach(function (field) {

            const f = Block.Create('input', field.attrs || {}, field.classes || []);
            this.append(f);
        }.bind(this));//к чему bind?
    }

    /**
     *
     * @param {function} callback
     */
    onSubmit(callback) {
        this.el.addEventListener('submit', function (e) {
            e.preventDefault();
            const formdata = {};
            const elements = this.el.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        }.bind(this));
    }

    /**
     * Выполняет сброс формы
     */
    reset() {
        this.el.reset();
    }
}

export default Form;
