import bus from '../../modules/event-bus.js';
export default class GameScene {
    constructor(gameview, gamefield, cardfield, profilefield, cell, wrapper) {
        this.cardfield = cardfield;
        this.el = gameview;
        this.lines = gamefield;
        this.cell = cell;
        this.wrapper = wrapper;
        console.log(this.lines, 'lines');
        this.profilefield = profilefield;

        this.compScoreField = document.createElement('div');
        this.compScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.compScoreField);

        this.btnPassEl = document.createElement('div');
        this.btnPassEl.setAttribute('class', 'profilefield__btn-pass');
        this.btnPassEl.setAttribute('value', 'ПАС');
        this.btnPassEl.innerText = 'ПАС';
        this.btnPassEl.onclick = () => {
            bus.emit('ROUND');
        };
        this.profilefield.appendChild(this.btnPassEl);

        this.userScoreField = document.createElement('div');
        this.userScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.userScoreField);
        console.log(this);
    }

    setrerender(state) {// TODO Попадание карты на поле, где уже есть карта; Вывод карты компа;
        // TODO Не работает подсчет очков при втором выводе карты на поле; Сортировка карты исходя из ее типа(b,c,d)
        this.userScoreField.innerHTML = 'Очков за раунд: ' + state[0].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[0].roundWin;
        this.compScoreField.innerHTML = 'Очков за раунд: ' + state[1].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[1].roundWin;
        //const childs = [];
        console.log('state', state)
        var numberCell = 0;
        state.forEach((player, playerIndex) => {
            if (playerIndex === 0) {
                const child = this.cardfield.children;
                Object.keys(child).forEach((card) => {
                    const cardEl = child[card].children[0];
                    cardEl.onmousedown = (e) => {
                        console.log('child', this.wrapper);
                        cardEl.style.cursor = "pointer";
                        console.log('car', cardEl);
                        let coords = getCoords(cardEl);
                        const shiftX = e.pageX - coords.left;
                        const shiftY = e.pageY - coords.top;
                        cardEl.style.position = 'absolute';
                        //document.body.appendChild(cardEl);
                        moveAt(e);

                        document.onmousemove = (e) => {
                            moveAt(e);
                        };

                        cardEl.onmouseup = (d) => {
                            document.onmousemove = null;
                            cardEl.onmouseup = null;
                            //let setCell = this.cell[0];
                            const needFirstCoords = getCoords(this.lines[3]);
                            const needSecondCoords = getCoords(this.lines[5]);
                            const Upcoords = getCoords(cardEl);
                            if ((d.pageX >= needFirstCoords.left && d.pageX <= needFirstCoords.right)
                                && (d.pageY >= needFirstCoords.top && d.pageY <= needSecondCoords.bottom)) {
                                this.lines.forEach((el, elIndex) => {
                                    const lineCoords = getCoords(el);
                                    if ((d.pageX >= lineCoords.left && d.pageX <= lineCoords.right)
                                        && (d.pageY >= lineCoords.top && d.pageY <= lineCoords.bottom)) {
                                        if (elIndex === 3) {
                                            for (let i = 24; i < 32; ++i) {
                                                const cellCoords = getCoords(this.cell[i]);
                                                if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                    && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                    cardEl.setAttribute('style', '');
                                                    this.cell[i].appendChild(cardEl);
                                                    numberCell = i;
                                                    return this.cell[i];
                                                }
                                            }
                                        }
                                        if (elIndex === 4) {
                                            for (let i = 32; i < 40; ++i) {
                                                const cellCoords = getCoords(this.cell[i]);
                                                if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                    && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                    cardEl.setAttribute('style', '');
                                                    numberCell = i;
                                                    this.cell[i].appendChild(cardEl);
                                                    return this.cell[i];
                                                }
                                            }
                                        }
                                        if (elIndex === 5) {
                                            for (let i = 40; i < 48; ++i) {
                                                const cellCoords = getCoords(this.cell[i]);
                                                if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                    && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                    if (this.cell[i].firstChild === null) {//условие повтора карты на одно поле
                                                        console.log('nofull', this.cell[i].children);
                                                        cardEl.setAttribute('style', '');
                                                        numberCell = i;
                                                        this.cell[i].appendChild(cardEl);
                                                    }
                                                    else {
                                                        console.log('full');
                                                    }
                                                    return this.cell[i];
                                                }
                                            }
                                        }
                                    }
                                });
                                console.log('CARD', card)
                                bus.emit('ONMOUSEUP', {
                                    playerIndex,
                                    card,
                                    numberCell
                                });
                            }
                            else {
                                cardEl.setAttribute('style', '');
                                cardEl.setAttribute('transition', 'all 30s easy-in-out');
                                this.wrapper[card].appendChild(cardEl);
                                console.log('CARDEL', cardEl);
                                console.log('state', state);
                                console.log('CHILD', child[card]);
                                console.log('CHILD2', child);
                                return;
                            }

                            if (state[0].line4.length === 0 || state[1].line4.length === 0) {
                                bus.emit('ROUND');
                            }
                        };


                        //     function setCell(elIndex, d) {// 0: 0 - 7, 1: 8 - 15, 2: 16 - 23, 3: 24 - 31
                        //
                        // };

                        cardEl.ondragstart = () => {
                            return false;
                        };

                        function moveAt(e) {
                            cardEl.style.left = e.pageX - shiftX + 'px';
                            cardEl.style.top = e.pageY - shiftY + 'px';
                        }

                        function getCoords(element) {
                            let box = element.getBoundingClientRect();
                            return {
                                left: box.left + pageXOffset,
                                right: box.right + pageXOffset,
                                top: box.top + pageYOffset,
                                bottom: box.bottom + pageYOffset
                            };
                        }
                    };

                });
            }
        });
    }

    render(state) {

        state.forEach((player, playerIndex) => {
            player.line4.forEach((card,cardIndex) => {
                const cardEl = this.createCardImg(card.type, card.score);
                if (playerIndex === 0) {
                    console.log('this.wrapper[i]', this.wrapper[cardIndex])
                    this.cardfield.appendChild(this.wrapper[cardIndex]);
                    this.cardfield.children[cardIndex].appendChild(cardEl);
                }
            });
        });
        this.userScoreField.innerHTML = 'Очков за раунд: ' + state[0].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[0].roundWin;
        this.compScoreField.innerHTML = 'Очков за раунд: ' + state[1].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[1].roundWin;

        this.setrerender(state);
    }

    createCardImg(type, score) {
        const cardEl = document.createElement('img');
        const src = './img/cards/' + type + score + '.jpg';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }

}
