'use strict';

import Strategy from './strategy.js';
import bus from '../../../modules/event-bus.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class SinglePlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        this.btnPassEl.onclick = () => {
            this.round();
        };

        this.userCards = [];
        this.compCards = [];
        this.createArray(this.userCards);
        this.createArray(this.compCards);


        this.state = [{
            playerName: 'User',
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }, {
            playerName: 'Opponent',
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }];

        bus.on('DEALCARDS', (payload) => {
            const data = payload.payload;
            let arrayOfCards = data.cards;
            let player = data.player;
            arrayOfCards.forEach((card) => {
                const cardEl = this.createCardImg(card.index);
                player.line4.push({
                    type: card.type,
                    score: card.score,
                    domEl: cardEl,
                    index: card.index
                });
                if (player.playerName === 'User') {
                    this.cardfield.appendChild(cardEl);
                    cardEl.onclick = (e) => {
                        bus.emit('CHOOSECARD', {
                            card
                        });
                        e.target.onclick = null;
                    };
                }
            });
        });

        this.dealCards(this.state[0], this.userCards, 8);
        this.dealCards(this.state[1], this.compCards, 8);

        bus.on('ROUND', (payload) => {
            const data = payload.payload;
            this.printScore(data);
        });

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            this.userGo(data);
            this.opponentCard();
            if (this.isRound()) {
                this.round();
            }
        });

    }

    userGo(data) {
        this.state[0].line4.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                card.domEl.remove();
                this.pushCardInLine(this.userGamefield, card);
                this.pushCardInState(this.state[0], card);
                this.state[0].roundScores += card.score;
                this.state[0].line4.splice(cardIndex, 1);
            }
        });
    }

    opponentCard() {
        let maxCard = this.state[1].line4[0];
        this.state[1].line4.forEach((card) => {
            if (maxCard.score < card.score) {
                maxCard = card;
            }
        });
        this.opponentGo(maxCard);
    }

    opponentGo(data) {
        this.state[1].line4.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                this.pushCardInLine(this.opponentGamefield, card);
                this.pushCardInState(this.state[1], card);
                this.state[1].roundScores += card.score;
                this.state[1].line4.splice(cardIndex, 1);
            }
        });
        this.printScore({
            userScore: this.state[0].roundScores,
            userRounds: this.state[0].roundWin,
            opponentScore: this.state[1].roundScores,
            opponentRounds: this.state[1].roundWin
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

    dealCards(player, deck, cardsCount) {
        let arr = this.createArrayOfCards(deck, cardsCount);
        bus.emit('DEALCARDS', {
            player: player,
            cards: arr
        });
    }

    isRound() {
        if (this.state[0].line4.length === 0 || this.state[1].line4.length === 0) {
            return true;
        }
        return false;
    }

    isUserWinRound() {
        let userScores = this.countScores(this.state[0]);
        let opponentScores = this.countScores(this.state[1]);
        return (userScores >= opponentScores);
    }

    isUserWin() {
        return (this.state[0].roundWin >= this.state[1].roundWin);
    }


    round() {
        if (this.isUserWinRound()) {
            this.state[0].roundWin += 1;
        } else {
            this.state[1].roundWin += 1;
        }

        this.state[0].roundScores = 0;
        this.state[1].roundScores = 0;
        bus.emit('ROUND', {
            userScore: this.state[0].roundScores,
            userRounds: this.state[0].roundWin,
            opponentScore: this.state[1].roundScores,
            opponentRounds: this.state[1].roundWin
        });

        this.cleanBoard();
        this.cleanState(this.state[0]);
        this.cleanState(this.state[1]);
        if (this.isGameOver()) {
            this.gameOver();
        } else {
            this.dealCards(this.state[0], this.userCards, 2);
            this.dealCards(this.state[1], this.compCards, 2);
        }
    }

    countScores(player) {
        let scores = 0;
        player.line1.forEach((card) => {
            scores += card.score;
        });
        player.line2.forEach((card) => {
            scores += card.score;
        });
        player.line3.forEach((card) => {
            scores += card.score;
        });
        return scores;
    }

    isGameOver() {
        if (this.state[0].roundWin > 2 || this.state[1].roundWin > 2) {
            return true;
        }
        return false;
    }

    gameOver() {
        this.showResult(this.isUserWin());
        this.cleanBoard();
    }

    createCard(type, score, index, array) {
        array.push({
            type: type,
            score: score,
            index: index
        });
    }

    createArray(array) {
        let ind = 1;
        this.createCard('b', 2, ind, array);  ind++;
        this.createCard('b', 4, ind, array);  ind++;
        this.createCard('b', 8, ind, array);  ind++;
        this.createCard('b', 8, ind, array);  ind++;
        this.createCard('b', 9, ind, array);  ind++;
        this.createCard('b', 1100, ind, array);  ind++;
        this.createCard('b', 12, ind, array);  ind++;
        this.createCard('b', 12, ind, array);  ind++;

        this.createCard('c', 1, ind, array);  ind++;
        this.createCard('c', 2, ind, array);  ind++;
        this.createCard('c', 5, ind, array);  ind++;
        this.createCard('c', 7, ind, array);  ind++;
        this.createCard('c', 9, ind, array);  ind++;
        this.createCard('c', 10, ind, array);  ind++;
        this.createCard('c', 11, ind, array);  ind++;

        this.createCard('d', 1, ind, array);  ind++;
        this.createCard('d', 2, ind, array);  ind++;
        this.createCard('d', 3, ind, array);  ind++;
        this.createCard('d', 3, ind, array);  ind++;
        this.createCard('d', 4, ind, array);  ind++;
        this.createCard('d', 5, ind, array);  ind++;
        this.createCard('d', 6, ind, array);  ind++;
        this.createCard('d', 6, ind, array);  ind++;
        this.createCard('d', 7, ind, array);  ind++;
    }
}
