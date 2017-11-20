'use strict';

import '../game-view/game.css';
import './training.css';
import BaseView from '../../modules/view.js';
import Router from '../../modules/router';

let arrayCards = ['mityam', 'navr', 'ostapenko'];
let currentStep = null;
let firstStep = document.createElement('div');
let secondStep = null;
let thirdStep = null;
let button = document.createElement('div');
button.setAttribute('class', 'button_3d');
button.innerHTML = 'Дальше';
let steps = ['firstStep', 'secondStep', 'thirdStep'];

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

        this.zoomEl = document.createElement('div');
        this.zoomEl.setAttribute('class', 'game-view__zoomEl');
        this.gameEl.appendChild(this.zoomEl);

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
        if (steps[0] === 'firstStep') {
            const first = (callback) => {
                this.cardfield.setAttribute('class', 'firstStep__cardfield');
                this.cardfield.style.border = '5px solid #FDEAA8';
                setTimeout(callback, 1500);
            };
            first(() => {
                firstStep.setAttribute('class', 'firstStep');
                firstStep.style.position = 'absolute';
                firstStep.style.left = 40 + 'px';
                firstStep.style.bottom = 120 + 'px';
                this.el.appendChild(firstStep);
                firstStep.innerHTML = '<p class="text-typing"> Это твое карточное <br>поле </p>';
                firstStep.appendChild(button);
                this.accordingTo(button);
            });
        }
        if (steps[0] === 'secondStep') {
            const second = (callback) => {
                this.computerCardfield.setAttribute('class', 'firstStep__cardfield');
                this.computerCardfield.style.border = '5px solid #FDEAA8';
                this.cardfield.style.border = '';
                this.cardfield.setAttribute('class', 'training-view__cardfield');
                setTimeout(callback, 1500);
            };
            second(() => {
                firstStep.innerHTML = '<p class="text-typing"> Это карточное поле <br>соперника </p>';
                firstStep.appendChild(button);
                this.accordingTo(button);
            });
        }
    }

    accordingTo(button) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            steps.shift();
            this.render();
        });
    }

    createCard(name) {
        const cardEl = document.createElement('img');
        const src = './img/cards/'+ name + '.png';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }

}