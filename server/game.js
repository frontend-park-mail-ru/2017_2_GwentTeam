'use strict';

//const debug = require('debug')('app:game');

class Game {
    constructor() {
        console.log('constr');
        //debug('Создаём инстанс игры');
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
            playerName: 'User1',
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }, {
            playerName: 'User2',
            roundWin: 0,
            roundScores: 0,
            line1: [],
            line2: [],
            line3: [],
            line4: []
        }];

    }

    addPlayer(player) {
        //debug('Добавляем нового игрока');
        //console.log('add');
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

        console.log(`Добавили игрока ${id}`);

        player.id = id;

        let array = this.dealCards(player.id, 8);
        player.send(JSON.stringify({
            event: 'DEALCARDS',
            payload: array
        }));

        player.on('close', function() {
            console.log(`Игрок ${id} отключился`);
            this.stop(id);

        }.bind(this));

        player.on('message', function(msg) {
            console.log(`Игрок ${id} прислал message`, msg);
            let oppon = this.player1;
            if (id === 0) {
                oppon = this.player2;
            }
            const message = JSON.parse(msg);
            if (msg === 'update') {
                return;
             }
            else if (message.event === 'userGo') {
                //console.log(this);
                oppon.send(JSON.stringify({
                    event: 'OPPONENTGO',
                    payload: {
                        card: this.allCards[0][0],
                        score: {
                            userScore: this.state[0].roundScores,
                            userRounds: this.state[0].roundWin,
                            opponentScore: this.state[1].roundScores,
                            opponentRounds: this.state[1].roundWin
                        }
                    }
                }));
            }
            //this.handleMessageFromPlayer(id, JSON.parse(msg));
        }.bind(this));
    }

    userGo(player, opponent, cardIndex) {
        
    }

    dealCards(id, cardsCount) {
        console.log('deal');
        let arrayOfCards = [];
        for (let i = 0; i < cardsCount; i++) {
            const cardIndex = Math.floor(Math.random() * this.allCards[id].length);
            arrayOfCards.push(this.allCards[id][cardIndex]);
            this.state[id].line4.push(this.allCards[id][cardIndex]);
            this.allCards[id].splice(cardIndex, 1);
        }
        return arrayOfCards;
    }

    // stop(id) {
    //     if (this.inplay) {
    //         this.reset();
    //     }
    //     if (this[id]) {
    //         this[id].close();
    //     }
    //     this[id] = null;
    // }
    //
    // reset() {
    //     debug('Сбрасываем инстанс игры');
    //     ['player1', 'player2'].forEach(id => this.send(id, 'SIGNAL_FINISH_GAME', {
    //         message: 'Игра окончена. Ваш противник покинул игру'
    //     }));
    //     if (this.player1) {
    //         this.player1.close();
    //     }
    //     if (this.player2) {
    //         this.player2.close();
    //     }
    //     this.player1 = null;
    //     this.player2 = null;
    //     this.inplay = false;
    //     this.gameState = null;
    //     if (this.interval) {
    //         //clearInterval(this.interval)
    //     }
    // }
    //
    // send(id, type, payload = null) {
    //     try {
    //         if (this[id]) {
    //             let body = JSON.stringify({
    //                 type,
    //                 payload
    //             });
    //             if (type !== 'SIGNAL_NEW_GAME_STATE') {
    //                 debug(`send to ${id}`, body);
    //             }
    //             //this[id].send(body);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         return null;
    //     }
    // }
    //
    //
    //
    // onNewPlayerLoggedIn(id, payload) {
    //     debug(id, payload);
    //     this[id].username = payload.username;
    //     debug([this['player1'] && this['player1'].username, this['player2'] && this['player2'].username]);
    //     if (this['player1'] && this['player1'].username && this['player2'] && this['player2'].username) {
    //         this.startGame();
    //     } else {
    //         this.send(id, 'SIGNAL_TO_WAIT_OPPONENT');
    //     }
    // }
}
module.exports = Game;
