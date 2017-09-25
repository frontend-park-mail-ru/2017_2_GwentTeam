import Block from '../block/index.js';
'use strict';

class Form extends Block {
    constructor(fields = []) {
        const el = document.createElement('form');
        super(el);

        fields.forEach(function (field) {
            const f = Block.Create('input', field.attrs || {}, field.classes || []);
            this.append(f);
        }.bind(this));
    }

    onSubmit(callback) {
        this.el.addEventListener('submit', function (e) {
            e.preventDefault();
            const formdata = {};
            const elements = this.el.elements;
            console.log(elements);
            for (let name in elements) {
                console.log(name);
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        }.bind(this));
    }

    reset() {
        this.el.reset();
    }
}

export default Form;
