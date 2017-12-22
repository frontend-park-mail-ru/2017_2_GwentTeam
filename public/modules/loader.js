import '../styles.styl';

export default class Loader {
    constructor() {
        this.back = document.querySelector('.background-loader');
        this.loader = document.querySelector('.loader');
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