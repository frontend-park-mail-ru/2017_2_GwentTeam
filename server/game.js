'use strict';

class Game {
    constructor() {
        this.player1 = null;
        this.player2 = null;
        this.inplay = false;
        this.allCards = [
            [],
            []
        ];
        let ind = 0;
        let typeOfCards = ['b', 'c', 'd'];
        typeOfCards.forEach((type) => {
            for (let i = 1; i < 9; i++) {
                this.allCards[0].push({
                    type: type,
                    score: i,
                    index: ind
                });
                this.allCards[1].push({
                    type: type,
                    score: i,
                    index: ind
                });
                ind++;
            }
        });
        this.state = [{
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }, {
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }];
    }

    addPlayer(player) {
        let id = null;
        if (!this.player1) {
            this.player1 = player;
            id = 0;
        } else if (!this.player2) {
            this.player2 = player;
            id = 1;
        } else {
            return;
        }

        player.id = id;

        let array = this.dealCards(player.id, 8);
        player.send(JSON.stringify({
            event: 'DEALCARDS',
            payload: array
        }));

        if (player.id === 0) {
            player.send(JSON.stringify({
                event: 'OPPORTUNITY_TO_GO',
                payload: true
            }));
        }

        player.on('close', () => {
            this.stop();
        });

        player.on('message', (msg) => {
            let oppon = this.player1;
            if (id === 0) {
                oppon = this.player2;
            }
            if (msg === 'ROUND') {
                oppon.send(JSON.stringify({
                    event: 'OPPORTUNITY_TO_GO',
                    payload: true
                }));
                this.round(player, oppon);
            } else {
                const message = JSON.parse(msg);
                if (message.event === 'userGo') {
                    this.userGo(player, oppon, message.payload);
                }
            }
        });
    }
    stop() {
        this.reset();
    }

    reset() {
        if (this.player1) {
            this.player1.close();
        }
        if (this.player2) {
            this.player2.close();
        }
        this.player1 = null;
        this.player2 = null;
        this.inplay = false;
        this.state = null;

        this.allCards = [
            [],
            []
        ];
        let ind = 0;
        let typeOfCards = ['b', 'c', 'd'];
        typeOfCards.forEach((type) => {
            for (let i = 1; i < 9; i++) {
                this.allCards[0].push({
                    type: type,
                    score: i,
                    index: ind
                });
                this.allCards[1].push({
                    type: type,
                    score: i,
                    index: ind
                });
                ind++;
            }
        });

        this.state = [{
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }, {
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }];
    }

    userGo(player, opponent, cardId) {
        this.state[player.id].line4.forEach((card, cardIndex) => {
            if (card.index === cardId) {
                this.pushCardInState(this.state[player.id], card);
                this.state[player.id].roundScores += card.score;
                this.state[player.id].line4.splice(cardIndex, 1);

                opponent.send(JSON.stringify({
                    event: 'OPPONENTGO',
                    payload: {
                        card: card,
                        score: {
                            userScore: this.state[opponent.id].roundScores,
                            userRounds: this.state[opponent.id].roundWin,
                            opponentScore: this.state[player.id].roundScores,
                            opponentRounds: this.state[player.id].roundWin
                        }
                    }
                }));
            }
        });
    }

    round(player, opponent) {
        this.roundScoresCount(this.state[player.id], this.state[opponent.id]);
        if (this.isGameOver()) {
            this.gameOver(player, opponent);
        } else {
            this.cleanState();
            player.send(JSON.stringify({
                event: 'ROUND',
                payload: {
                    userScore: this.state[player.id].roundScores,
                    userRounds: this.state[player.id].roundWin,
                    opponentScore: this.state[opponent.id].roundScores,
                    opponentRounds: this.state[opponent.id].roundWin
                }
            }));
            opponent.send(JSON.stringify({
                event: 'ROUND',
                payload: {
                    userScore: this.state[opponent.id].roundScores,
                    userRounds: this.state[opponent.id].roundWin,
                    opponentScore: this.state[player.id].roundScores,
                    opponentRounds: this.state[player.id].roundWin
                }
            }));
        }
    }

    cleanState() {
        this.state.forEach((player) => {
            player.line1 = [];
            player.line2 = [];
            player.line3 = [];
            player.roundScores = 0;
        });
    }

    isGameOver() {
        if (this.allCards[0].length === 0 || this.allCards[1].lenght === 0) {
            return true;
        }
        if (this.state[0].roundWin > 2 || this.state[1].roundWin > 2) {
            return true;
        }
        return false;
    }

    gameOver(player, opponent) {
        if (this.state[player.id].roundWin > 2) {
            player.send(JSON.stringify({
                event: 'GAMEOVER',
                payload: true
            }));
            opponent.send(JSON.stringify({
                event: 'GAMEOVER',
                payload: false
            }));
        } else {
            opponent.send(JSON.stringify({
                event: 'GAMEOVER',
                payload: true
            }));
            player.send(JSON.stringify({
                event: 'GAMEOVER',
                payload: false
            }));
        }
    }

    roundScoresCount(playerState, opponentState) {
        if (playerState.roundScores > opponentState.roundScores) {
            playerState.roundWin += 1;
        } else if (playerState.roundScores < opponentState.roundScores) {
            opponentState.roundWin += 1;
        } else {
            playerState.roundWin += 1;
            opponentState.roundWin += 1;
        }
    }

    dealCards(id, cardsCount) {
        let arrayOfCards = [];
        for (let i = 0; i < cardsCount; i++) {
            const cardIndex = Math.floor(Math.random() * this.allCards[id].length);
            arrayOfCards.push(this.allCards[id][cardIndex]);
            this.state[id].line4.push(this.allCards[id][cardIndex]);
            this.allCards[id].splice(cardIndex, 1);
        }
        return arrayOfCards;
    }

    pushCardInState(playerState, card) {
        if (card.type === 'b') {
            playerState.line1.push(card);
        }
        if (card.type === 'c') {
            playerState.line2.push(card);
        }
        if (card.type === 'd') {
            playerState.line3.push(card);
        }
    }
}
module.exports = Game;
