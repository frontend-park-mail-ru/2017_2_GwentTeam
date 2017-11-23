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
        this.createCards('b', 8, ind, this.allCards[0]);
        this.createCards('c', 7, ind, this.allCards[0]);
        this.createCards('d', 9, ind, this.allCards[0]);
        this.createCards('b', 8, ind, this.allCards[1]);
        this.createCards('c', 7, ind, this.allCards[1]);
        this.createCards('d', 9, ind, this.allCards[1]);

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
        console.log(`Add player ${player.id}`);

        if(this.player1 && this.player2) {
            this.startGame();
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

    startGame() {
        this.player1.send(JSON.stringify({
            event: 'START_GAME'
        }));
        this.player2.send(JSON.stringify({
            event: 'START_GAME'
        }));

        let array = this.dealCards(this.player1.id, 8);
        this.player1.send(JSON.stringify({
            event: 'DEALCARDS',
            payload: array
        }));

        array = this.dealCards(this.player2.id, 8);
        this.player2.send(JSON.stringify({
            event: 'DEALCARDS',
            payload: array
        }));

        this.player1.send(JSON.stringify({
                event: 'OPPORTUNITY_TO_GO',
                payload: true
            }));

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
        this.createCards('b', 8, ind, this.allCards[0]);
        this.createCards('c', 7, ind, this.allCards[0]);
        this.createCards('d', 9, ind, this.allCards[0]);
        this.createCards('b', 8, ind, this.allCards[1]);
        this.createCards('c', 7, ind, this.allCards[1]);
        this.createCards('d', 9, ind, this.allCards[1]);


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

    createCards(type, count, index, array) {
        for (let i = 1; i < count; i++) {
            array.push({
                type: type,
                score: i,
                index: index
            });
            index++;
        }
    }
}
module.exports = Game;
