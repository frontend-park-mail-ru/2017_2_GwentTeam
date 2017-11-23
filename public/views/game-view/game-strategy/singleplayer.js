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

        let ind = 0;
        this.userCards = [];
        let typeOfCards = ['b', 'c', 'd'];
        typeOfCards.forEach((type) => {
            for (let i = 1; i < 9; i++) {
                this.userCards.push({
                    type: type,
                    score: i,
                    index: ind
                });
                ind++;
            }
        });

        this.compCards = [];
        ind = 0;
        typeOfCards.forEach((type) => {
            for (let i = 1; i < 9; i++) {
                this.compCards.push({
                    type: type,
                    score: i,
                    index: ind
                });
                ind++;
            }
        });

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
            let arrayOfCards = data.cards; //
            let player = data.player; //
            console.log(arrayOfCards);
            arrayOfCards.forEach((card) => {
                const cardEl = this.createCardImg(card.type, card.score);
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
            })
        });

        this.dealCards(this.state[0], this.userCards, 8);
        this.dealCards(this.state[1], this.compCards, 8);

        bus.on('ROUND', (payload) => {
            const data = payload.payload;
            this.printScore(data);
        })

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            this.userGo(data);
            this.opponentCard();
            if (this.isRound()) {
                this.round();
            }
        });

        // bus.on('OPPONENTGO', (payload) => {
        //   const data = payload.payload;   //&
        //   //console.log(data);
        //   this.opponentGo(data.card);
        //   this.printScore(data.score);
        // })


        // bus.on('GAMEOVER', (payload) => {
        //   const data = payload.payload;
        //   this.showResult(data);
        // })
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
        })
    }

    opponentCard() {
        let maxCard = this.state[1].line4[0];
        let index = 0;
        this.state[1].line4.forEach((card, cardIndex) => {
            if (maxCard.score < card.score) {
                maxCard = card;
                index = cardIndex;
            }
        });
        //console.log(maxCard);
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
        })
        this.printScore({
            userScore: this.state[0].roundScores,
            userRounds: this.state[0].roundWin,
            opponentScore: this.state[1].roundScores,
            opponentRounds: this.state[1].roundWin
        });
    }

    createArrayOfCards(deck, cardsCount) {
        console.log('dealCards');
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
        console.log(userScores);
        console.log(opponentScores);
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
        })
        player.line2.forEach((card) => {
            scores += card.score;
        })
        player.line3.forEach((card) => {
            scores += card.score;
        })
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
}
