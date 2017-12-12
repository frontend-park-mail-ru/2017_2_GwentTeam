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

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            this.userGo(data);
            this.opponentGo();
            this.isRound() ? this.round() : {};
        });
    }

    opponentCard() {
        let maxCard = this.compState.gameCards[0];
        this.compState.gameCards.forEach((card) => {
            if (maxCard.score < card.score) {
                maxCard = card;
            }
        });
        return maxCard;
    }

    opponentGo() {
        let opponentCard = this.opponentCard();
        this.compState.gameCards.forEach((card, cardIndex) => {
            if (card.index === opponentCard.index) {
                this.pushCardInState(this.compState, card);
                this.compState.roundScores += card.score;
                this.compState.gameCards.splice(cardIndex, 1);
            }
        });
        bus.emit('OPPONENTGO', {
            card: opponentCard,
            score: {
                opponentScore: this.compState.roundScores,
                opponentRounds: this.compState.roundWin
            }
        });
    }

    createArrayOfDealCards(deck, cardsCount) {
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
        return (this.userState.roundScores >= this.compState.roundScores);
    }

    isUserWin() {
        return (this.userState.roundWin >= this.compState.roundWin);
    }

    round() {
        this.isUserWinRound() ? this.userState.roundWin++ : this.compState.roundWin++;
        this.compState.roundScores = 0;
        this.userState.roundScores = 0;
        bus.emit('ROUND', {
            opponentScore : this.compState.roundScores,
            opponentRounds : this.compState.roundWin,
            userScore : this.userState.roundScores,
            userRounds : this.userState.roundWin
        });

        this.cleanState(this.compState);
        this.isGameOver() ? bus.emit('GAMEOVER', this.isUserWin()) : this.dealCards(this.roundCardsCount);
    }

    dealCards(cardsCount) {
        let arrayOfUserCards = this.createArrayOfDealCards(this.userCards, cardsCount);
        bus.emit('DEALCARDS', arrayOfUserCards);
        this.createArrayOfDealCards(this.compCards, cardsCount).forEach((card) => {
            this.compState.gameCards.push(card);
        });
    }

    isGameOver() {
        return (this.userState.roundWin > this.roundsCount || this.compState.roundWin > this.roundsCount);
    }

    createArray(types, scores) {
        let arrayOfResult = [];
        scores.forEach((score, index) => {
            arrayOfResult.push({ type: types[index], score: score, index:index + 1});
        });
        return arrayOfResult;
    }
}
