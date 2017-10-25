export default class Card {
    constructor(score, type, cardfield, gamer) {
        this.score = score;
        this.type = type;
        this.cardfield = cardfield;
        this.url = './img/cards/' + type + score + '.jpg';
        this.img = document.createElement('img');  //TODO через this(?)
        this.img.setAttribute('src', this.url);
        this.img.setAttribute('class', 'cardImg');
        cardfield.appendChild(this.img);


        this.img.onclick = function(c) {
            //console.log("Кликните на одно из подсвеченных мест");
            cardfield.removeChild(this.img);
            this.cardfield = document.getElementById('user-' + this.type);
            this.cardfield.appendChild(this.img);
        }.bind(this);
    }
}
