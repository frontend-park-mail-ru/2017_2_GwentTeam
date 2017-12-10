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

import bus from '../modules/event-bus.js';
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

        let b = new GameBoard(); //TODO ?
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

        this.cardfield = new Cardfield();
        this.boardEl.addEl(this.cardfield);

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

        bus.on('DEALCARDS', (payload) => {
            let arrayOfCards = payload.payload;
            arrayOfCards.forEach((card) => {
                let newCard = new Card(card);
                this.userState.gameCards.push(newCard);
                this.cardfield.addCard(newCard);
                newCard.domEl.onclick = (e) => {
                    bus.emit('CHOOSECARD', {
                        card: newCard
                    });
                    e.target.onclick = null;
                };
            });
        });

        bus.on('ROUND', (payload) => {
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

        bus.on('OPPONENTGO', (payload) => {
            const data = payload.payload;
            const newCard = new Card(data.card);
            this.pushCardInLine(this.opponentGamefield, newCard);
            this.compScoreField.printScore({
                score: data.score.opponentScore,
                rounds: data.score.opponentRounds
            });
            this.canUserGo = true;
        });

        bus.on('GAMEOVER', (payload) => {
            const data = payload.payload;
            this.cleanBoard();
            this.cardfield.clean();
            this.showResult(data);
        });
    }

    showResult(isUserWin) {
        isUserWin ? this.showMessage('Вы выиграли!') : this.showMessage('Вы проиграли:(');
    }

    showMessage(msg) {
        this.infoWindow.turnonInfo(msg);
    }

    pushCardInLine(arrayOfLines, card) {
        arrayOfLines[card.type].addCard(card);
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
        this.userScoreField.printScore({
            score: this.userState.roundScores,
            rounds: this.userState.roundWin
        });
    }
}
