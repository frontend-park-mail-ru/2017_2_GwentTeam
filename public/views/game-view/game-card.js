export default class Card {
    constructor(url, scores, type, scene) {
        let canv = document.getElement('application__game-view');
        this.url = url;
        console.log('game-card.construct');
        this.scores = scores;
        this.img = canv.createElement("img");
        this.img.setAttribute("src", this.url);
        this.img.border = "10 px inset black";
        this.type = type;
        let obj = this;

        /*this.img.onclick = function(c) {
            console.log("Кликните на одно из подсвеченных мест");
            if(obj.type=="1"){
            lightCanvas(arr1, obj);
            } else if(obj.type=="2") {
                lightCanvas(arr2, obj);
            } else {
                lightCanvas(arr3, obj);
            }
        }*/
    }
}
