'use strict';

import Strategy from './strategy.js';

import bus from '../modules/event-bus.js';

import {
    EVENTS
} from './events.js';
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

        this.initialDeck();
        this.canUserGo = true;

        this.startCardsCount = 8;
        this.roundCardsCount = 2;
        this.roundsCount = 2;

        this.gameType = 'singleplayer';

        this.compState = {
            playerName: 'Opponent',
            roundWin: 0,
            roundScores: 0,
            lines: {
                b: [],
                c: [],
                d: []
            },
            gameCards: []
        };


        let cb = bus.on(EVENTS.CARD.CHOOSE, (payload) => {
            const data = payload.payload.card;
            bus.emit(EVENTS.CARD.HIDE);
            this.userGo(data);
            setTimeout(() => {
                this.opponentGo();
                this.isRound() ? this.round() : {};
            }, 2300);
        });
        this.busCallbacks.push(cb);

        cb = bus.on(EVENTS.CARD.DECK, (payload) => {
            this.userCards = this.createArray(payload.payload);
            this.compCards = this.createArray(payload.payload);
            this.dealCards(this.startCardsCount);
        });
        this.busCallbacks.push(cb);
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
        bus.emit(EVENTS.GAME.OPPONENTGO, {
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
        bus.emit(EVENTS.GAME.ROUND, {
            opponentScore: this.compState.roundScores,
            opponentRounds: this.compState.roundWin,
            userScore: this.userState.roundScores,
            userRounds: this.userState.roundWin
        });

        this.cleanState(this.compState);
        this.isGameOver() ? bus.emit(EVENTS.GAME.GAMEOVER, this.isUserWin()) : this.dealCards(this.roundCardsCount);
    }

    dealCards(cardsCount) {
        let arrayOfUserCards = this.createArrayOfDealCards(this.userCards, cardsCount);
        bus.emit(EVENTS.CARD.DEAL, arrayOfUserCards);
        this.createArrayOfDealCards(this.compCards, cardsCount).forEach((card) => {
            this.compState.gameCards.push(card);
        });
    }

    isGameOver() {
        return (this.userState.roundWin > this.roundsCount || this.compState.roundWin > this.roundsCount);
    }

    createArray(deck) {
        let arrayOfResult = [];
        for (let key in deck) {
            arrayOfResult.push(deck[key]);
        }
        return arrayOfResult;
    }
}
