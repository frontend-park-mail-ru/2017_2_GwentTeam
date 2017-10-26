'use strict';

import './game.css';
import BaseView from '../../modules/view.js';
import GameScene from './game-scene.js';
import bus from '../../modules/event-bus.js';

/**
* @module GameView
* @extends BaseView
*/
export default class GameView extends BaseView {
    constructor(parentElement) {
        console.log('game-view construct');
        super(parentElement, null, true);


        this.profilefield = document.createElement('div');     //this
        this.profilefield.setAttribute('class', 'game-view__profilefield');
        this.el.appendChild(this.profilefield);

        this.gameView = document.createElement('div');
        this.gameView.setAttribute('class', 'game-view');
        this.el.appendChild(this.gameView);

        this.gamefield = [];

        for (let i = 0; i < 6; i++) {
            this.gamefield.push(document.createElement('div'));
        }

        this.gamefield.forEach((field, fieldIndex) => {
            //const scorefield = document.createElement('div');
            field.setAttribute('class', 'user');
            //field.appendChild(scorefield);
            this.gameView.appendChild(field);
        });
        this.cardfield = document.createElement('div');     //this
        this.cardfield.setAttribute('class', 'game-view__cardfield');
        this.el.appendChild(this.cardfield);


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
        console.log(this.allCards);

        this.state = [{
            playerName: 'User',
            roundWin: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        },{
            playerName: 'Computer',
            roundWin: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }];
        this.dealCards(8);
        this.scene = new GameScene(this.gameView, this.gamefield, this.cardfield, this.profilefield);      //TODO (gamegield - array, cardfild-поле)

        bus.on('CHOOSECARD', (payload) => {                                //TODO
            console.log('choosecard');
            const data = payload.payload;
            this.userGo(data.playerIndex, data.cardIndex);
            this.competitorGo();
            if (this.isGameOver()) {
                this.GameOver();
            }
            this.rerender();
        });


        bus.on('ROUND', ()  => {
            let user = this.whoWinRound(this.state[0], this.state[1]);
            user.roundWin += 1;
            if (this.isGameOver()) {
                this.GameOver();
            }
            this.dealCards(2);
            this.rerender();
        });
        //this.start();
        // this.el.innerHTML = gameTemplate({});
        // const cardfield = document.getElementById('game-view__cardfield');
        // const gamefield= document.getElementById('game-view__gamefield');
        // const scene = new GameScene(gamefield, cardfield, this);
    }

    rerender(){
        console.log('rerender');
        this.scene.render(this.state);

        // const logo = document.getElementsByClassName('app__logo');
        // Object.keys(logo).forEach((element) => {
        //     const el = logo[element];
        //     el.setAttribute('hidden', true);
        // })
    }



    start() {

        console.log('game-view start');
        this.render();
    }

    render() {
        console.log('game-view render');
        //this.el.innerHTML = gameTemplate({});
        // const cardfield = document.getElementById('game-view__cardfield');
        // const gamefield = document.getElementById('game-view__gamefield');
        // const scene = new GameScene(gamefield, cardfield, this);

        this.rerender();


    }
    GameOver() {
        let winner = this.whoWinGame(this.state[0], this.state[1]);
        alert(winner.playerName + ' выиграл!');
        // const logo = document.getElementsByClassName('app__logo');
        // Object.keys(logo).forEach((element) => {
        // const el = logo[element];
        // el.setAttribute('hidden', false);
        //this.router.go('/');
    }

    isGameOver(){
        if (this.state[0].roundWin === 2 || this.state[1].roundWin === 2) {
            return true;
        }
        return false;
    }

    userGo(playerIndex, cardIndex) {

        let card = this.state[playerIndex].line4[cardIndex];
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

    pushCardInLine(playerIndex, cardIndex) {
        const card = this.state[playerIndex].line4[cardIndex];
        if (card.type === 'b') {
            this.state[playerIndex].line1.push(card);
        }
        if (card.type === 'c') {
            this.state[playerIndex].line2.push(card);
        }
        if (card.type === 'd') {
            this.state[playerIndex].line3.push(card);
        }
        this.state[playerIndex].line4.splice(cardIndex, 1);
    }


    dealCards(countOfCards) {
        for(let i = 0; i < countOfCards; i++) {
            const cardIndex = Math.floor(Math.random() * this.allCards.length);
            //console.log(this.state);
            this.state.forEach((player) => {
                const cardIndex = Math.floor(Math.random() * this.allCards.length);
                //console.log(cardIndex);
                player.line4.push(this.allCards[cardIndex]);
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


}
