var scoresl1 = 0;
var scoresl2 = 0;
var scoresl3 = 0;
var allscores = 0;
function setQ(canv, card) {
    alert("Посылаем карту, которая напечатается у противника" + card.scores);
    alert("Посылаем тот канвас, на котором отпечатается изображение" + canv);
}
function lightCanvas(canvases, card) {
    canvases.forEach(function(element) {
        element.canvas.className = "canv1";
        element.canvas.onclick = function() {
            var cont = element.canvas.getContext("2d");
            var img = new Image();
            img.src = card.url;
            cont.drawImage(img, 0, 0);
            if(card.type=="1") {
                scoresl1 += card.scores;
                allscores += card.scores;
                alert("Очки на линии: "+ scoresl1+"\nОчков всего: "+ allscores);
                setQ(this, card);
            } else if(card.type=="2") {
                scoresl2 += card.scores;
                allscores += card.scores;
                alert("Очки на линии: "+ scoresl2+"\nОчков всего: "+ allscores);
                setQ(this, card);
            } else {
                scoresl3 += card.scores;
                allscores += card.scores;
                alert("Очки на линии: "+ scoresl3+"\nОчков всего: "+ allscores);
                setQ(this, card);
            }
            card.img.remove();
            canvases.forEach(function(element) {
                element.canvas.className = "";
            });
        }
    }, this);

}

class Card {
    constructor(url, scores, type) {
        this.url = url;
        this.scores = scores;
        this.img = document.createElement("img");
        this.img.setAttribute("src", this.url);
        this.img.border = "1 px inset black";
        document.body.appendChild(this.img);
        this.type = type;
        var obj = this;
        
        this.img.onclick = function(c) {
            alert("Кликните на одно из подсвеченных мест");
            if(obj.type=="1"){
            lightCanvas(arr1, obj);
            } else if(obj.type=="2") {
                lightCanvas(arr2, obj);
            } else {
                lightCanvas(arr3, obj);
            }
        }
    }
}

var line1 = document.createElement("div");
var line2 = document.createElement("div");
var line3 = document.createElement("div");

document.body.appendChild(line1);
document.body.appendChild(line2);
document.body.appendChild(line3);

class Canvas {
    constructor(width, height, line, field) {
        this.canvas = document.createElement("canvas");
        this.line = line;
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        field.appendChild(this.canvas);
    }
}

function createLine(line) {
    var firstline = [];
    for(var i=0;i<10;i++) {
    var canv = new Canvas(110, 146, "first", line);
    firstline.push(canv);
    }

    return firstline;
}




var arr1 = createLine(line1);
var arr2 = createLine(line2);
var arr3 = createLine(line3);



var card1 = new Card("cards/b4.jpg", 4, "3");
var card2 = new Card("cards/b6.jpg", 6, "3");
var card3 = new Card("cards/b9.jpg", 9, "3");
var card4 = new Card("cards/c8.jpg", 8, "2");
var card5 = new Card("cards/c10.jpg", 10, "2");
var card6 = new Card("cards/c13.jpg", 13, "2");
var card7 = new Card("cards/d8.jpg", 8, "1");
var card8 = new Card("cards/d11.jpg", 11, "1");
var card9 = new Card("cards/d14.jpg", 14, "1");

