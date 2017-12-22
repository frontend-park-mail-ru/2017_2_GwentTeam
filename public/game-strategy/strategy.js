'use strict';
import Info from '../modules/info.js';

import GameBoard from '../game-components/gameboard/gameboard.js';
import Cardfield from '../game-components/cardfield/cardfield.js';
import Scorefield from '../game-components/scorefield/scorefield.js';
import ButtonPass from '../game-components/btn-pass/btn-pass.js';
import ButtonExit from '../game-components/btn-exit/btn-exit.js';
import Card from '../game-components/card/card.js';
import GameWrapper from '../game-components/game-wrapper/game-wrapper.js';
import Profilefield from '../game-components/profilefield/profilefield.js';
import BoardWrapper from '../game-components/board-wrapper/board-wrapper.js';
import SelectedCard from '../game-components/selected-card/selected-card.js';
import Preloader from '../game-components/preloader/preloader.js';

import { EVENTS } from './events.js';

import bus from '../modules/event-bus.js';
/**
 * GameStrategy
 * @name GameStrategy
 * @class GameStrategy
 */
export default class GameStrategy {
    constructor(router, el) {

        this.busCallbacks = [];

        this.router = router;
        this.el = el;

        // let img1 = new Image();
        // let img = new Image();
        // img1.src = './img/cards-sm-monster.png';
        // img.src = './img/cards-lg-monster.png';

        this.infoWindow = new Info();

        this.gameEl = new GameWrapper();
        this.el.appendChild(this.gameEl.el);

        this.profilefield = new Profilefield();
        this.gameEl.addEl(this.profilefield);

        this.btnExitEl = new ButtonExit(this.router);
        this.profilefield.addEl(this.btnExitEl);

        this.boardEl = new BoardWrapper();
        this.gameEl.addEl(this.boardEl);

        this.selectedCardEl = new SelectedCard();
        this.gameEl.addEl(this.selectedCardEl);

        let b = new GameBoard();
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

        for (let key in this.opponentGamefield) {
            this.boardEl.addEl(this.opponentGamefield[key]);
        }
        for (let key in this.userGamefield) {
            this.boardEl.addEl(this.userGamefield[key]);
        }

        this.preloader = new Preloader();
        this.el.appendChild(this.preloader.el);

        this.cardfield = new Cardfield();
        this.el.appendChild(this.cardfield.el);

        this.compScoreField = new Scorefield();
        this.profilefield.addEl(this.compScoreField);

        this.btnPassEl = new ButtonPass();
        this.profilefield.addEl(this.btnPassEl);

        this.userScoreField = new Scorefield();
        this.profilefield.addEl(this.userScoreField);

        this.userScoreField.printScore({
            score: 0,
            rounds: 0
        });
        this.compScoreField.printScore({
            score: 0,
            rounds: 0
        });

        this.userState = {
            roundWin: 0,
            roundScores: 0,
            lines: {
                b: [],
                c: [],
                d: []
            },
            gameCards: []
        };
        //console.log(EVENTS);


        let cb = bus.on(EVENTS.CARD.DEAL, (payload) => {
            let arrayOfCards = payload.payload;
            arrayOfCards.forEach((card) => {
                let newCard = new Card(card);
                this.userState.gameCards.push(newCard);
                this.cardfield.addCard(newCard);
                newCard.domEl.onclick = (e) => {
                    if (this.canUserGo) {
                        this.canUserGo = false;
                        bus.emit(EVENTS.CARD.CHOOSE, {
                            card: newCard
                        });
                        e.target.onclick = null;
                    }
                };
            });
            this.preloader.hide();
        });
        this.busCallbacks.push(cb);

        cb = bus.on(EVENTS.GAME.ROUND, (payload) => {
            const data = payload.payload;
            this.compScoreField.printScore({
                score: data.opponentScore,
                rounds: data.opponentRounds
            });
            this.userScoreField.printScore({
                score: data.userScore,
                rounds: data.userRounds
            });
            this.userState.roundScores = 0;
            this.userState.roundWin = data.userRounds;
            this.cleanBoard();
            this.cleanState(this.userState);
        });
        this.busCallbacks.push(cb);

        cb = bus.on(EVENTS.GAME.OPPONENTGO, (payload) => {
            const data = payload.payload;
            const newCard = new Card(data.card);
            this.pushCardInLine(this.opponentGamefield, newCard);
            this.compScoreField.printScore({
                score: data.score.opponentScore,
                rounds: data.score.opponentRounds
            });
            if (this.gameType === 'multiplayer') {
                this.preloader.illuminate();
            }
            this.canUserGo = true;
        });
        this.busCallbacks.push(cb);

        cb = bus.on(EVENTS.GAME.GAMEOVER, (payload) => {
            const data = payload.payload;
            this.cleanBoard();
            this.cardfield.clean();
            this.showResult(data);
        });
        this.busCallbacks.push(cb);
    }

    showResult(isUserWin) {
        isUserWin ? this.showMessage('Вы выиграли!') : this.showMessage('Вы проиграли:(');
    }

    showMessage(msg) {
        this.infoWindow.turnonInfo(msg);
    }

    pushCardInLine(arrayOfLines, card) {
        arrayOfLines[card.type].addCard(card);
        card.onboard = true;
        //card.illuminate();
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

    userGo(data) {
        this.userState.gameCards.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                card.domEl.remove();
                this.pushCardInLine(this.userGamefield, card);
                this.pushCardInState(this.userState, card);
                this.userState.roundScores += card.score;
                this.userState.gameCards.splice(cardIndex, 1);
            }
        });
        //console.log(this.userState);
        this.userScoreField.printScore({
            score: this.userState.roundScores,
            rounds: this.userState.roundWin
        });
    }

    destroy() {
        this.busCallbacks.forEach((f) => {
            f();
        });
        this.selectedCardEl.destroy();
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }

}
