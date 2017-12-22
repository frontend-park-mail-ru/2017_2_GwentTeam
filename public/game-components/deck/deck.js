import './deck.styl';

export default class Deck {
    constructor() {
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'deck');
        this.rect = document.createElement('div');
        this.rect.setAttribute('class', 'deck__rect');
        //this.rect.innerHTML = `<select name="deck" id="deck" onchange="change(this)" ">
        //                        <option value="teachers" >Нечисть</option>
        //                        <option value="students">Чуваки</option>
        //                        </select>`
        this.addLocal(this.rect);

    }

    addLocal(el){
        this.el.appendChild(el);
    }

    addEl(el) {
        this.rect.appendChild(el.el);
    }

    addToDocument() {
        document.body.appendChild(this.el);
    }

    hide() {
        this.el.style.opacity = '0';
        this.el.setAttribute('hidden', 'hidden');
    }

    show() {
        this.el.removeAttribute('hidden');
        this.el.setAttribute('class', 'deck_active');
        this.el.style.opacity = '1';
    }
}