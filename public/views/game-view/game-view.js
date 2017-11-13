'use strict';

import './game.css';
import BaseView from '../../modules/view.js';
import GameScene from './game-scene.js';
import bus from '../../modules/event-bus.js';
import Router from '../../modules/router.js';

/**
* @module GameView
* @extends BaseView
*/
export default class GameView extends BaseView {
    constructor(parentElement) {
        const router = new Router();
        super(parentElement, router, true);


        this.gameEl = document.createElement('div');
        this.gameEl.setAttribute('class', 'game-view');
        this.el.appendChild(this.gameEl);

        let html = document.documentElement;
        this.fullscreen(html);


        this.profilefield = document.createElement('div');
        this.profilefield.setAttribute('class', 'game-view__profilefield');
        this.gameEl.appendChild(this.profilefield);

        this.btnExitEl = document.createElement('div');
        this.btnExitEl.setAttribute('class', 'profilefield__btn-exit');
        this.btnExitEl.innerHTML = 'В главное меню';
        this.profilefield.appendChild(this.btnExitEl);

        this.btnExitEl.onclick = () => {
            this.router.go('/');
        };

        this.boardEl = document.createElement('div');
        this.boardEl.setAttribute('class', 'game-view__game-board');
        this.gameEl.appendChild(this.boardEl);

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
        this.cardfield.setAttribute('class', 'game-view__cardfield');
        this.boardEl.appendChild(this.cardfield);

        this.wrapper = [];

        for (let i = 0; i < 8; ++i) {
            this.wrapper.push(document.createElement('div'));
            this.wrapper[i].setAttribute('class', 'cardfield__wrapper');
        }

        this.allCards = [];
        let typeOfCards = ['b', 'c', 'd'];
        typeOfCards.forEach((type) => {
            for (let i = 1; i < 9; i++) {
                this.allCards.push({
                    type: type,
                    score: i
                });
            }
        });

        this.state = [{
            playerName: 'User',
            roundWin: 0,
            roundScores: 0,
            line1: new Array(8),
            line2: new Array(8),
            line3: new Array(8),
            line4: new Array(8)
        },{
            playerName: 'Computer',
            roundWin: 0,
            roundScores: 0,
            line1: new Array(8),
            line2: new Array(8),
            line3: new Array(8),
            line4: new Array(8)
        }];
        this.dealCards(8);
        this.scene = new GameScene(this.boardEl, this.gamefield, this.cardfield, this.profilefield, this.cell, this.wrapper);      //TODO (gamegield - array, cardfild-поле)

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload;
            this.userGo(data.playerIndex, data.cardIndex);
            this.competitorGo();
            if (this.isGameOver()) {
                this.GameOver();
            }
            this.rerender();
        });

        bus.on('ONMOUSEUP', (payload) => {
            const data = payload.payload;
            if (data.numberCell !== null) {
                this.userGo(data.playerIndex, data.card, data.numberCell);
            }
            this.competitorGo();
            this.setrerender();
        });


        bus.on('ROUND', ()  => {
            let user = this.whoWinRound(this.state[0], this.state[1]);
            user.roundWin += 1;
            if (this.isGameOver()) {
                this.GameOver();
            }
            this.dealCards(2);
            this.state.forEach((player) => {
                player.roundScores = 0;
            });
            this.rerender();
        });
        console.log(this);
    }

    rerender(){
        this.scene.render(this.state);
    }

    setrerender() {
        this.scene.setrerender(this.state);
    }
    start() {
        this.render();
    }

    render() {
        this.rerender();

    }
    GameOver() {
        let winner = this.whoWinGame(this.state[0], this.state[1]);
        alert(winner.playerName + ' выиграл!');
    }

    isGameOver(){
        if (this.state[0].roundWin === 2 || this.state[1].roundWin === 2) {
            return true;
        }
        return false;
    }

    userGo(playerIndex, cardIndex) {
        this.pushCardInLine(playerIndex, cardIndex);
    }

    competitorGo() {
        const playerIndex = 1;
        let comp = this.state[playerIndex];
        let maxCard = comp.line4[0];
        let index = 0;
        comp.line4.forEach((card, cardIndex) => {
            if (maxCard.score < card.score) {
                maxCard = card;
                index = cardIndex;
            }
        });
        this.pushCardInLine(playerIndex, index);
    }

    pushCardInLine(playerIndex, cardIndex, number) {
        const card = this.state[playerIndex].line4[cardIndex];
        if (card.type === 'b') {
            this.state[playerIndex].line1[number % 8] = card;
        }
        if (card.type === 'c') {
            this.state[playerIndex].line2[number % 8] = card;
        }
        if (card.type === 'd') {
            this.state[playerIndex].line3[number % 8] = card;
        }
        this.state[playerIndex].roundScores += card.score;
        this.state[playerIndex].line4.splice(cardIndex, 1);
        console.log('card', this.state[playerIndex].line4);
    }


    dealCards(countOfCards) {
        for(let i = 0; i < countOfCards; i++) {
            this.state.forEach((player) => {
                const cardIndex = Math.floor(Math.random() * this.allCards.length);
                player.line4[i] = this.allCards[cardIndex];
                this.allCards.splice(cardIndex, 1);
            });
        }
    }

    whoWinRound(user1, user2) {
        let score1 = this.scoreCount(user1);
        let score2 = this.scoreCount(user2);
        if (score1 > score2) return user1;
        return user2;
    }

    whoWinGame(user1, user2) {
        if (user1.roundWin === 2) {
            return user1;
        }
        return user2;
    }

    scoreCount(profile) {
        let count = 0;
        profile.line1.forEach((card) => {
            count += card.score;
        });
        profile.line2.forEach((card) => {
            count += card.score;
        });
        profile.line3.forEach((card) => {
            count += card.score;
        });
        return count;
    }

     fullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}
