'use strict';

import './game.css';
import BaseView from '../../modules/view.js';
import GameScene from './game-scene.js';
import gameTemplate from './game.pug';


/*function setQ(canv, card) {
    console.log("Посылаем карту, которая напечатается у противника" + card.scores);
    console.log("Посылаем тот канвас, на котором отпечатается изображение" + canv);
}
function lightCanvas(canvases, card) {
    canvases.forEach(function(element) {
        element.canvas.className = "canv1";
        element.canvas.onclick = function() {
            let cont = element.canvas.getContext("2d");
            let img = new Image();
            img.src = card.url;
            cont.drawImage(img, 0, 0);
            if(card.type=="1") {
                scoresl1 += card.scores;
                allscores += card.scores;
                console.log("Очки на линии: "+ scoresl1+"\nОчков всего: "+ allscores);
                setQ(this, card);
            } else if(card.type=="2") {
                scoresl2 += card.scores;
                allscores += card.scores;
                console.log("Очки на линии: "+ scoresl2+"\nОчков всего: "+ allscores);
                setQ(this, card);
            } else {
                scoresl3 += card.scores;
                allscores += card.scores;
                console.log("Очки на линии: "+ scoresl3+"\nОчков всего: "+ allscores);
                setQ(this, card);
            }
            card.img.remove();
            canvases.forEach(function(element) {
                element.canvas.className = "";
            });
        }
    }, this);

}


function createLine(line) {
    let firstline = [];
    for(let i=0;i<10;i++) {
    let canv = new Canvas(110, 146, "first", line);
    firstline.push(canv);
    }

    return firstline;
}
*/

/**
 * Класс GameView
 * @module GameView
 * @extends BaseView
 */
export default class GameView extends BaseView {

    start() {
        /*const logo = document.getElementsByClassName('app__logo');
        Object.keys(logo).forEach((element) => {
            const el = logo[element];
            el.setAttribute('hidden', true);
        })*/
        console.log('game-view start');
        this.render();
    }

    render() {
        console.log('game-view render');
        this.el.innerHTML = gameTemplate({});
        const t = document.getElementById('gameId');
        let img = document.createElement("img");
        img.setAttribute("src", 'img/cards/b4.jpg');
        img.setAttribute("class", 'cardImg');
        t.appendChild(img);

        //const card1 = new Card("/cards/b4.jpg", 4, "3");
        //this.el.innerHTML = gameTemplate({
            //let line1 = document.createElement("div");
        //});
        //this.el.innerHTML = gameTemplate({});
    }
}
