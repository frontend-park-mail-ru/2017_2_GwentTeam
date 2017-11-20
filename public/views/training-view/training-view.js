'use strict';

import '../game-view/game.css';
import './training.css';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router';

let arrayCards = ['mityam', 'navr', 'ostapenko'];

export default class TrainingView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);

        this.gameEl = document.createElement('div');
        this.gameEl.setAttribute('class', 'game-view');
        this.el.appendChild(this.gameEl);

        this.profilefield = document.createElement('div');
        this.profilefield.setAttribute('class', 'game-view__profilefield');
        this.gameEl.appendChild(this.profilefield);

        this.btnExitEl = document.createElement('div');
        this.btnExitEl.setAttribute('class', 'profilefield__btn-exit');
        this.btnExitEl.innerHTML = 'В главное меню';
        this.profilefield.appendChild(this.btnExitEl);

        this.compScoreField = document.createElement('div');
        this.compScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.compScoreField);

        this.btnPassEl = document.createElement('div');
        this.btnPassEl.setAttribute('class', 'profilefield__btn-pass');
        this.btnPassEl.setAttribute('value', 'ПАС');
        this.btnPassEl.innerText = 'ПАС';
        // this.btnPassEl.onclick = () => {
        //     bus.emit('ROUND');
        // };
        this.profilefield.appendChild(this.btnPassEl);

        this.userScoreField = document.createElement('div');
        this.userScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.userScoreField);

        this.btnExitEl.onclick = () => {
            this.router.go('/');
        };

        this.userScoreField.innerHTML = 'Очков за раунд: ' +
            '<br/><br/>Выиграно раундов:  ';
        this.compScoreField.innerHTML = 'Очков за раунд: ' +
            '<br/><br/>Выиграно раундов:  ';

        this.boardEl = document.createElement('div');
        this.boardEl.setAttribute('class', 'game-view__game-board');
        this.gameEl.appendChild(this.boardEl);

        this.computerCardfield = document.createElement('div');
        this.computerCardfield.setAttribute('class', 'game-view__cardfield');
        this.boardEl.appendChild(this.computerCardfield);

        this.gamefield = [];
        this.cell = []; //поч так нельзя?
        for (let i = 0; i < 6; i++) {
            this.gamefield.push(document.createElement('div'));
        }

        this.gamefield.forEach((field) => {
            field.setAttribute('class', 'game-board__board-item');
            this.boardEl.appendChild(field);

        });
        for (let i = 0; i < 48; i++) {
            this.cell.push(document.createElement('div'));
        }
        this.cell.forEach((field) => {
            field.setAttribute('class', 'game-view__board-item-cell');
        });
        let counter = 0;
        let i = 0;
        this.gamefield.forEach((field) => {
            for (i = 0 + counter; i < 8 + counter; ++i) {
                field.appendChild(this.cell[i]);
            }
            counter += 8;
        });

        this.cardfield = document.createElement('div');
        this.cardfield.setAttribute('class', 'training-view__cardfield');
        this.boardEl.appendChild(this.cardfield);

        this.wrapper = [];
        this.computerWrapper = [];

        for (let i = 0; i < 3; ++i) {
            this.wrapper.push(document.createElement('div'));
            this.computerWrapper.push(document.createElement('div'));
            this.wrapper[i].setAttribute('class', 'cardfield__wrapper');
            this.computerWrapper[i].setAttribute('class', 'cardfield__wrapper');
        }
    }

    start() {
        if (this.cardfield.children.length === 0 && this.computerCardfield.children.length === 0) {
            for (let i = 0; i < 3; ++i) {
                this.wrapper[i].appendChild(this.createCard(arrayCards[i]));
                this.computerWrapper[i].appendChild(this.createCard(arrayCards[i]));
                this.cardfield.appendChild(this.wrapper[i]);
                this.computerCardfield.appendChild(this.computerWrapper[i]);
            }
        }
        this.render();
    }
    render() {
        let firstStep = null;
        const first = (callback) => {
            firstStep = document.createElement('div');
            firstStep.setAttribute('class', 'firstStep');
            firstStep.style.position = 'absolute';
            firstStep.style.left = 100 + 'px';
            firstStep.style.bottom = 100 + 'px';
            this.el.appendChild(firstStep);
            this.cardfield.style.border = '3px solid blue';
            this.cardfield.style.borderLeftColor = 'orange';
            this.cardfield.style.borderRightColor = 'orange';
            callback();
        };
        first(() => {
            firstStep.innerHTML = '<p class="text-typing"> Это такая то штука </p>';
        });
        //setTimeout(first, 1000);
    }

    createCard(name) {
        const cardEl = document.createElement('img');
        const src = './img/cards/'+ name + '.png';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }

}