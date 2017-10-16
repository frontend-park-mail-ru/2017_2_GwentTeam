'use strict';
import Block from '../../modules/block.js';

export default class Form extends Block {

    /**
    * @param {} fields - элементы формы
    * @constructor
    */
    constructor(element, fields = []) {
        super(element);
        this.fields = fields;
    }

    /**
    *
    * @param {function} callback
    */
    onSubmit(callback) {
        this.unsub = this.on('submit', function (event) {
            event.preventDefault();

            const elements = this.el.elements;
            const formdata = Object.create(null);

            this.fields.forEach(function (field) {
                formdata[field] = elements[field].value;
            });

            callback(formdata);
        }.bind(this));
        // this.el.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     const formdata = {};
        //     const elements = this.el.elements;
        //     for (let name in elements) {
        //         formdata[name] = elements[name].value;
        //     }
        //     callback(formdata);
        //});
    }

    /**
    * Выполняет сброс формы
    */
    reset() {
        this.el.reset();
    }
}

