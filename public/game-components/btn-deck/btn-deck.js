export default class ButtonDeck {
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'form-input');
        this.el.innerHTML = 'Играть';
    }
}