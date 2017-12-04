'use strict';
import Info from '../modules/info.js';

import GameBoard from '../game-components/gameboard/gameboard.js';
import Cardfield from '../game-components/cardfield/cardfield.js';
import Scorefield from '../game-components/scorefield/scorefield.js';
import ButtonPass from '../game-components/btn-pass/btn-pass.js';
/**
 * GameStrategy
 * @name GameStrategy
 * @class GameStrategy
 */
export default class GameStrategy {
    constructor(router, el) {

        this.router = router;
        this.el = el;

        this.infoWindow = new Info();

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

        this.btnExitEl.onclick = () => {
            this.router.go('/');
        };

        this.boardEl = document.createElement('div');
        this.boardEl.setAttribute('class', 'game-view__game-board');
        this.gameEl.appendChild(this.boardEl);

         let b = new GameBoard();      //TODO ?
         let c = new GameBoard();
         let d = new GameBoard();

        this.userGamefield = {
            b, c, d
        };
        b = new GameBoard();
        c = new GameBoard();
        d = new GameBoard();
        this.opponentGamefield = {
            d, c, b
        };

        for(let key in this.opponentGamefield) {
            this.boardEl.appendChild(this.opponentGamefield[key].el);
        }
        for(let key in this.userGamefield) {
            this.boardEl.appendChild(this.userGamefield[key].el);
        }

        this.cardfield = new Cardfield();
        this.boardEl.appendChild(this.cardfield.el);

        this.compScoreField = new Scorefield();
        this.profilefield.appendChild(this.compScoreField.el);

        this.btnPassEl = new ButtonPass();
        this.profilefield.appendChild(this.btnPassEl.el);

        this.userScoreField = new Scorefield();
        this.profilefield.appendChild(this.userScoreField.el);

        this.userScoreField.printScore({
            score: 0,
            rounds: 0
        });
        this.compScoreField.printScore({
            score: 0,
            rounds: 0
        });

        this.userState = {
            playerName: 'User',     //TODO
            roundWin: 0,
            roundScores: 0,
            lines: {
                b:[],
                c:[],
                d:[]
            },
            gameCards: []
        };
    }

    createCardImg(index) {
        const cardEl = document.createElement('img');
        const src = './img/cards/'+ index + '.png';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }

    showResult(isUserWin) {
        isUserWin ? this.showMessage('Вы выиграли!') : this.showMessage('Вы проиграли:(');
    }

    showMessage(msg) {
        this.infoWindow.turnonInfo(msg);
    }

    pushCardInLine(arrayOfLines, card) {
        arrayOfLines[card.type].addCard(card.domEl);
    }

    pushCardInState(playerState, card) {
        playerState.lines[card.type].push(card);
    }

    cleanState(playerState) {
        for (let line in playerState.lines) {
            playerState.lines[line] = [];
        }
    }

    cleanBoard() {
        for (let line in this.userGamefield) {
            this.userGamefield[line].clean();
        }
        for (let line in this.opponentGamefield) {
            this.opponentGamefield[line].clean();
        }
    }
}
