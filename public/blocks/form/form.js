'use strict';
import Block from '../../modules/block.js';

export default class Form extends Block {

    /**
    * @param {} fields - элементы формы
    * @constructor
    */
    constructor(element, fields) {
        super(element);
        this.fields = fields;
    }


    unsubscribe() {
        this.unsub();
    }

    /**
    *
    * @param {function} callback
    */
    onsubmit(callback) {
        console.log('elements',this.el.elements);
        this.el.addEventListener('submit', function (event) {
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
