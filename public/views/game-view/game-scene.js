import bus from '../../modules/event-bus.js';

export default class GameScene {
    constructor(gameview, gamefield, cardfield, profilefield, cell) {
        this.cardfield = cardfield;
        this.el = gameview;
        this.lines = gamefield;
        this.cell = cell;
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

    setrerender (state) {
        state.forEach((player, playerIndex) => {

            if (playerIndex === 0) {
                player.line1.forEach((card) => {
                    this.lines[3].appendChild(this.createCardImg(card.type, card.score));
                });

                player.line2.forEach((card) => {
                    this.lines[4].appendChild(this.createCardImg(card.type, card.score));
                });
                player.line3.forEach((card) => {
                    this.lines[5].appendChild(this.createCardImg(card.type, card.score));
                });

                player.line4.forEach((card, cardIndex) => {
                    const cardEl = this.createCardImg(card.type, card.score);
                    cardEl.onclick = () => {
                        bus.emit('CHOOSECARD', {
                            playerIndex,
                            cardIndex
                        });
                    };

                    cardEl.onmousedown = (e) => {
                        cardEl.style.cursor = "pointer";
                        console.log('ku');
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
                            let setCard = this.cell[0];
                            const Upcoords = getCoords(cardEl);
                            this.lines.forEach((el, elIndex) => {
                                const lineCoords = getCoords(el);
                                if ((d.pageX >= lineCoords.left && d.pageX <= lineCoords.right)
                                    && (d.pageY >= lineCoords.top && d.pageY <= lineCoords.bottom)) {
                                    if (elIndex === 3) {
                                        for (let i = 24; i < 32; ++i) {
                                            const cellCoords = getCoords(this.cell[i]);
                                            if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                console.log('this.cell[i]', this.cell[i]);
                                                setCard = this.cell[i];
                                                setCard.appendChild(cardEl);
                                                return setCard;
                                            }
                                        }
                                    }
                                    if (elIndex === 4) {
                                        for (let i = 32; i < 40; ++i) {
                                            const cellCoords = getCoords(this.cell[i]);
                                            if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                console.log('this.cell[i]', this.cell[i]);
                                                setCard = this.cell[i]
                                                setCard.appendChild(cardEl);
                                                return setCard;
                                            }
                                        }
                                    }
                                    if (elIndex === 5) {
                                        for (let i = 40; i < 48; ++i) {
                                            const cellCoords = getCoords(this.cell[i]);
                                            if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                                && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                                console.log('this.cell[i]', this.cell[i]);
                                                setCard = this.cell[i];
                                                setCard.appendChild(cardEl);
                                                return setCard;
                                            }
                                        }
                                    }
                                } else {
                                    cardEl;
                                }
                                bus.emit('ONMOUSEUP', {
                                    playerIndex,
                                    cardIndex,
                                    setCard
                                });

                            });
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

                    this.cardfield.appendChild(cardEl);
                });

            } else if (playerIndex === 1) {
                player.line1.forEach((card) => {
                    this.lines[2].appendChild(this.createCardImg(card.type, card.score));
                });

                player.line2.forEach((card) => {
                    this.lines[1].appendChild(this.createCardImg(card.type, card.score));
                });
                player.line3.forEach((card) => {
                    this.lines[0].appendChild(this.createCardImg(card.type, card.score));
                });

            }
        });
    }

    render(state) {

        // let child = this.cardfield.children;
        // console.log('child', child)
        // let arr = [];
        // Object.keys(child).forEach((element) => {
        //     console.log('element', element)
        //     const l = child[element];
        //     arr.push(l);
        // });
        // arr.forEach((elem) => {
        //     this.cardfield.removeChild(elem);
        //     console.log('elem', elem);
        // });

        // this.lines.forEach((line) => {
        //     let child = line.children;
        //     let arr = [];
        //     Object.keys(child).forEach((element) => {
        //         const l = child[element];
        //         arr.push(l);
        //     });
        //     arr.forEach((elem) => {
        //         line.removeChild(elem);
        //     });
        // });
        // this.cell.forEach((line) => {
        //     let child = line.children;
        //     let arr = [];
        //     Object.keys(child).forEach((element) => {
        //         const l = child[element];
        //         arr.push(l);
        //     });
        //     arr.forEach((elem) => {
        //         line.removeChild(elem);
        //     });
        // });

        state.forEach((player) => {
            player.line4.forEach((card) => {
                const cardEl = this.createCardImg(card.type, card.score);
                if (player === 0)
                    this.cardfield.appendChild(cardEl);
            });
        });


        this.userScoreField.innerHTML = 'Очков за раунд: ' + state[0].roundScores +
        '<br/><br/>Выигранно раундов:  ' + state[0].roundWin;
        this.compScoreField.innerHTML = 'Очков за раунд: ' + state[1].roundScores +
        '<br/><br/>Выигранно раундов:  ' + state[1].roundWin;


        if (state[0].line4.length === 0 || state[1].line4.length === 0) {
            bus.emit('ROUND');
        }
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
