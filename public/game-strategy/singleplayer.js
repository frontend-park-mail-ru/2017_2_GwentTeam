'use strict';

import Strategy from './strategy.js';
import bus from '../modules/event-bus.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class SinglePlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        this.btnPassEl.el.onclick = () => {
            this.round();
        };

        this.startCardsCount = 8;
        this.roundCardsCount = 2;
        this.roundsCount = 2;

        const b = 'b';
        const c = 'c';
        const d = 'd';
        const types = [b, b, b, b, b, b, b, b, c, c, c, c, c, c, c, d, d, d, d, d, d, d, d, d];
        const scores = [2, 4, 8, 8, 9, 1100, 12, 12, 1, 2, 5, 7, 9, 10, 11, 1, 2, 3, 3, 4, 5, 6, 6, 7];

        this.userCards = this.createArray(types, scores);
        this.compCards = this.createArray(types, scores);

        this.compState = {
            playerName: 'Opponent',
            roundWin: 0,
            roundScores: 0,
            lines: {
                b:[],
                c:[],
                d:[]
            },
            gameCards: []
        };

        this.dealCards(this.startCardsCount);

        bus.on('ROUND', (payload) => {
            this.userScoreField.printScore({
                score: this.userState.roundScores,
                rounds: this.userState.roundWin
            });
            this.compScoreField.printScore({
                score: this.compState.roundScores,
                rounds: this.compState.roundWin
            });
        });

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            this.userGo(data);
            this.opponentCard();
            this.isRound() ? this.round() : {};
        });
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

    opponentCard() {
        let maxCard = this.compState.gameCards[0];
        this.compState.gameCards.forEach((card) => {
            if (maxCard.score < card.score) {
                maxCard = card;
            }
        });
        this.opponentGo(maxCard);
    }

    opponentGo(data) {
        this.compState.gameCards.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                this.pushCardInLine(this.opponentGamefield, card);
                this.pushCardInState(this.compState, card);
                this.compState.roundScores += card.score;
                this.compState.gameCards.splice(cardIndex, 1);
            }
        });
        this.compScoreField.printScore({
            score: this.compState.roundScores,
            rounds: this.compState.roundWin
        });
    }

    createArrayOfCards(deck, cardsCount) {
        let arrayOfCards = [];
        for (let i = 0; i < cardsCount; i++) {
            const cardIndex = Math.floor(Math.random() * deck.length);
            arrayOfCards.push(deck[cardIndex]);
            deck.splice(cardIndex, 1);
        }
        return arrayOfCards;
    }


    isRound() {
        return (this.userState.gameCards.length === 0 || this.compState.gameCards.length === 0);
    }

    isUserWinRound() {
        let userScores = this.countScores(this.userState);
        let opponentScores = this.countScores(this.compState);
        return (userScores >= opponentScores);
    }

    isUserWin() {
        return (this.userState.roundWin >= this.compState.roundWin);
    }

    round() {
        this.isUserWinRound() ? this.userState.roundWin++ : this.compState.roundWin++;
        this.userState.roundScores = 0;
        this.compState.roundScores = 0;
        bus.emit('ROUND', {});

        this.cleanBoard();
        this.cleanState(this.userState);
        this.cleanState(this.compState);
        this.isGameOver() ? this.gameOver() : this.dealCards(this.roundCardsCount);
    }

    dealCards(cardsCount) {
        let arrayOfUserCards = this.createArrayOfCards(this.userCards, cardsCount);
        bus.emit('DEALCARDS', { cards: arrayOfUserCards});
        this.createArrayOfCards(this.compCards, cardsCount).forEach((card) => {
            this.compState.gameCards.push(this.createCard(card));
        });
    }

    countScores(playerState) {
        let scores = 0;
        for (let line in playerState.lines) {
            playerState.lines[line].forEach((card) => {
                scores += card.score;
            });
        }
        return scores;
    }

    isGameOver() {
        return (this.userState.roundWin > this.roundsCount || this.compState.roundWin > this.roundsCount);
    }

    gameOver() {
        this.showResult(this.isUserWin());
        this.cleanBoard();
    }

    createArray(types, scores) {
        let arrayOfResult = [];
        scores.forEach((score, index) => {
            arrayOfResult.push({ type: types[index], score: score, index:index + 1});
        });
        return arrayOfResult;
    }
}
