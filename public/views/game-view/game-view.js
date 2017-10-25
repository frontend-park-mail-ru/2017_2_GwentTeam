'use strict';

import './game.css';
import BaseView from '../../modules/view.js';
import GameScene from './game-scene.js';
import gameTemplate from './game.pug';


/**
* Класс GameView
* @module GameView
* @extends BaseView
*/
export default class GameView extends BaseView {

    start() {
        /*const logo = document.getElementsByClassName('app__logo');    //TODO
        Object.keys(logo).forEach((element) => {
        const el = logo[element];
        el.setAttribute('hidden', true);
        s})*/
        console.log('game-view start');
        this.render();
    }

    render() {
        console.log('game-view render');
        this.el.innerHTML = gameTemplate({});
        const cardfield = document.getElementById('game-view__cardfield');
        const gamefield = document.getElementById('game-view__gamefield');
        const scene = new GameScene(gamefield, cardfield);
        /*let img = document.createElement("img");
        img.setAttribute("src", 'img/cards/b4.jpg');
        img.setAttribute("class", 'cardImg');
        t.appendChild(img);*/

        //const card1 = new Card("/cards/b4.jpg", 4, "3");
        //this.el.innerHTML = gameTemplate({
        //let line1 = document.createElement("div");
        //});
        //this.el.innerHTML = gameTemplate({});
    }
}
