import '../styles.styl';

export default class Loader {
    constructor() {
        this.el = document.createElement('div');
        document.body.appendChild(this.el);
        this.back = document.createElement('div');
        this.back.setAttribute('class', 'background-loader');
        this.loader = document.createElement('div');
        this.loader.setAttribute('class', 'loader');

        this.el.appendChild(this.back);
        this.back.appendChild(this.loader);
        this.hideEl();
    }

    showEl() {
        this.back.removeAttribute('hidden');
        this.loader.removeAttribute('hidden');
    }

    hideEl() {
        this.back.setAttribute('hidden', 'hidden');
        this.loader.setAttribute('hidden', 'hidden');
    }
}