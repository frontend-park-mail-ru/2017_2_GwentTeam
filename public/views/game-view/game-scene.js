import Card from './game-card.js';

import bus from '../../modules/event-bus.js';

export default class GameScene {
    constructor(gameview, gamefield, cardfield, profilefield) {
        console.log('game-scene construct');
        //console.log(cardfield);
        this.cardfield = cardfield;
        this.el = gameview;
        this.lines = gamefield;
        this.profilefield = profilefield;


        this.compScoreField = document.createElement('div');
        this.compScoreField.setAttribute('class', 'comp-score');
        this.profilefield.appendChild(this.compScoreField);

        this.btn = document.createElement('button');
        this.btn.setAttribute('class', 'btn-pass');
        this.btn.setAttribute('value', 'ПАС');
        this.btn.innerText = 'ПАС';
        this.btn.onclick = () => {
            bus.emit('ROUND');
        };
        this.profilefield.appendChild(this.btn);

        this.userScoreField = document.createElement('div');
        this.userScoreField.setAttribute('class', 'user-score');
        this.profilefield.appendChild(this.userScoreField);

    }

    render(state) {

        let child = this.cardfield.children;     //TODO вынести в функцию
        let arr = [];
        Object.keys(child).forEach((element) => {
            const l = child[element];
            arr.push(l);
        });
        arr.forEach((elem) => {
            this.cardfield.removeChild(elem);
        });

        this.lines.forEach((line) => {
            let child = line.children;
            let arr = [];
            Object.keys(child).forEach((element) => {
                const l = child[element];
                arr.push(l);
            });
            arr.forEach((elem) => {
                line.removeChild(elem);
            });
        });
        let userscores = [0,0,0,0];
        let compscores = [0,0,0,0];
        state.forEach((player, playerIndex) => {

            if (playerIndex === 0) {
                player.line1.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[3].appendChild(cardEl);

                    userscores[1] += card.score;
                });

                player.line2.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[4].appendChild(cardEl);

                    userscores[2] += card.score;
                });
                player.line3.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[5].appendChild(cardEl);

                    userscores[3] += card.score;
                });

                player.line4.forEach((card, cardIndex) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    cardEl.onclick = () => {
                        bus.emit('CHOOSECARD', {
                            playerIndex,
                            cardIndex
                        });
                    };
                    //console.log(cardEl);
                    this.cardfield.appendChild(cardEl);
                });


                userscores[0] = userscores[1] + userscores[2] + userscores[3];
            } else if (playerIndex === 1) {
                player.line1.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[2].appendChild(cardEl);

                    compscores[1] += card.score;
                });

                player.line2.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[1].appendChild(cardEl);

                    compscores[2] += card.score;
                });
                player.line3.forEach((card) => {
                    const cardEl = document.createElement('img');
                    const src = './img/cards/' + card.type + card.score + '.jpg';
                    cardEl.setAttribute('src', src);
                    cardEl.setAttribute('class', 'cardImg');
                    this.lines[0].appendChild(cardEl);

                    compscores[3] += card.score;
                });

                compscores[0] = compscores[1] + compscores[2] + compscores[3];
            }
        });
        this.userScoreField.innerHTML = 'Очков за раунд: ' + userscores[0] +
        '     Выигранно раундов:  ' + state[0].roundWin;
        this.compScoreField.innerHTML = 'Очков за раунд: ' + compscores[0] +
        '     Выигранно раундов:  ' + state[1].roundWin;


        if (state[0].line4.length === 0 || state[1].line4.length === 0) {
            bus.emit('ROUND');
        }
    }

}
