import bus from '../../modules/event-bus.js';
//window.onload = () => {
let ca = null;
let shiftX = null;
let shiftY = null;
export default class GameScene {

    constructor(gameview, gamefield, cardfield, profilefield, cell, wrapper, computerCardfield, computerWrapper) {
        this.cardfield = cardfield;
        this.computerCardfield = computerCardfield;
        this.el = gameview;
        this.lines = gamefield;
        this.cell = cell;
        this.wrapper = wrapper;
        this.computerWrapper = computerWrapper;
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

    setrerender(state, computerObject) {// TODO Попадание карты на поле, где уже есть карта; Вывод карты компа;
        // TODO Не работает подсчет очков при втором выводе карты на поле; Сортировка карты исходя из ее типа(b,c,d)
        // TODO Добавить обработку при нажатии на карту, уже добавленную на линию
        let computerChild = null;
        let computerChoiceIndex = null;

        Object.keys(this.computerCardfield.children).forEach((computerCard) => {
            computerChild = this.computerCardfield.children[computerCard];
        });

        if (computerObject !== undefined) {
            let computerChoice = computerObject.card;
            computerChoiceIndex = computerObject.cardIndex;

            if (computerChoice !== undefined) {
                if (computerChoice !== null) {
                    if (computerChoice.type === 'b') {
                        computerChild.parentNode.removeChild(computerChild);
                        this.computerWrapper.splice(computerChoiceIndex, 1);
                        this.cell[15 + state[1].line1.length].appendChild(this.createCardImg(computerChoice.type, computerChoice.score));
                        //добавить линию рубашкой вверх
                    }
                    if (computerChoice.type === 'c') {
                        computerChild.parentNode.removeChild(computerChild);
                        this.computerWrapper.splice(computerChoiceIndex, 1);
                        this.cell[7 + state[1].line2.length].appendChild(this.createCardImg(computerChoice.type, computerChoice.score));
                    }
                    if (computerChoice.type === 'd') {
                        computerChild.parentNode.removeChild(computerChild);
                        this.computerWrapper.splice(computerChoiceIndex, 1);
                        this.cell[-1 + state[1].line3.length].appendChild(this.createCardImg(computerChoice.type, computerChoice.score));
                    }
                }
            }
        }
        this.userScoreField.innerHTML = 'Очков за раунд: ' + state[0].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[0].roundWin;
        this.compScoreField.innerHTML = 'Очков за раунд: ' + state[1].roundScores +
            '<br/><br/>Выигранно раундов:  ' + state[1].roundWin;

        console.log('state', state);
        const playerChoice = state[0].line4;
        const child = this.cardfield.children;
        console.log('child', child);

        Object.keys(child).forEach((card) => {//при нажатии главное меню и играть второй раз создается второй ряд
            console.log('cardEls', child);

            child[card].firstChild.addEventListener('mousedown', e => {//Большой drag n drop, чтобы карты можно было перемещать не только с
            //child[card].firstChild.onmousedown = (e) => {//Большой drag n drop, чтобы карты можно было перемещать не только с
                //cardfield но и с поля. Мб добавить внешний цикл if type.skill === ?
                console.log('cardEl', getCoords(e.target));
                ca = e.target;
                ca.style.cursor = "pointer";
                ca.setAttribute('class', 'cardfield__card-img-mousedown');

                console.log('car', ca, card);
                let coords = getCoords(ca);
                shiftX = e.pageX - coords.left;
                shiftY = e.pageY - coords.top;
                ca.style.position = 'absolute';


                //document.body.appendChild(cardEl);
                moveAt(e);

                function moveAt(e) {
                    ca.style.left = e.pageX - shiftX + 'px';
                    ca.style.top = e.pageY - shiftY + 'px';
                }

                document.onmousemove = (e) => {
                    moveAt(e);
                };
                let startX = null;
                let startY = null;
                let finishX = null;
                let finishY = null;
                let lineIndex = null;
                let cellIndex = null;
                e.target.onmouseup = (d) => {
                    document.onmousemove = null;
                    d.target.onmouseup = null;
                    console.log('cords', ca.style.left)
                    const needFirstCoords = getCoords(this.lines[3]);
                    const needSecondCoords = getCoords(this.lines[5]);
                    if ((d.pageX >= needFirstCoords.left && d.pageX <= needFirstCoords.right)
                        && (d.pageY >= needFirstCoords.top && d.pageY <= needSecondCoords.bottom)) {


                        this.lines.forEach((el, elIndex) => {
                            const lineCoords = getCoords(el);
                            if ((d.pageX >= lineCoords.left && d.pageX <= lineCoords.right)
                                && (d.pageY >= lineCoords.top && d.pageY <= lineCoords.bottom)) {
                                if (elIndex === 3 && playerChoice[card].type === 'b') {
                                    for (let i = 24; i < 32; ++i) {
                                        const cellCoords = getCoords(this.cell[i]);
                                        if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                            && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                            if (this.cell[i].firstChild === null) {//исправить дублирование кода
                                                lineIndex = 3;
                                                cellIndex = i;
                                                return;
                                            }
                                            else {// не нужен
                                                ca.setAttribute('style', '');
                                                child[card].appendChild(ca);
                                                console.log('full');
                                            }
                                        }
                                    }
                                }
                                if (elIndex === 4 && playerChoice[card].type === 'c') {
                                    for (let i = 32; i < 40; ++i) {
                                        const cellCoords = getCoords(this.cell[i]);
                                        if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                            && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                            if (this.cell[i].firstChild === null) {
                                                lineIndex = 4;
                                                cellIndex = i;
                                                return;
                                            }
                                            else {
                                                ca.setAttribute('style', '');
                                                child[card].appendChild(ca);
                                                console.log('full');
                                            }
                                        }
                                    }
                                }
                                if (elIndex === 5 && playerChoice[card].type === 'd') {
                                    for (let i = 40; i < 48; ++i) {
                                        const cellCoords = getCoords(this.cell[i]);
                                        if ((d.pageX >= (cellCoords.left) && d.pageX <= (cellCoords.right))
                                            && (d.pageY >= (cellCoords.top)) && d.pageY <= (cellCoords.bottom)) {
                                            if (this.cell[i].firstChild === null) {//условие повтора карты на одно поле
                                                lineIndex = 5;
                                                cellIndex = i;
                                                return;
                                            }
                                            else {
                                                ca.setAttribute('style', '');
                                                child[card].appendChild(ca);
                                                console.log('full');//если карту один раз поставить на свою, то в след раз нельзя ее перенести
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        if (lineIndex && cellIndex) {
                            console.log('cellIndex', cellIndex);
                            const Emit = (callback) => {
                                ca.setAttribute('style', '');
                                startX = d.pageX - shiftX;
                                console.log('cell', this, cellIndex)
                                startY = d.pageY - shiftY;
                                //ca.setAttribute('class', 'cardfield__card-img-modified');
                                this.cell[cellIndex].appendChild(ca);//
                                let appendFinishCoords = getCoords(this.cell[cellIndex]);
                                //finishX = d.pageX - shiftX;
                                finishX = appendFinishCoords.left;
                                finishY = appendFinishCoords.top;
                                //finishY = d.pageY - shiftY;
                                //this.cell[cellIndex].removeChild(ca);//
                                console.log(startX, startY, getCoords(this.cell[cellIndex]).left, getCoords(this.cell[cellIndex]).top, appendFinishCoords.left, finishY);
                                //this.cell[cellIndex].removeChild(ca);
                                ca.style.position= 'absolute';
                                ca.style.left = startX + 'px';
                                ca.style.top = startY + 'px';
                                console.log('tops', ca);
                                //ca.setAttribute('style', '');
                                ca.style.transition = 'all 1s linear';
                                ca.style.transform = `translate(${finishX - startX}px, ${finishY - startY}px)`;
                                //this.cell[cellIndex].appendChild(ca);
                                //ca.setAttribute('style', '');
                                //ca.style.position = '';
                                console.log('children', getCoords(d.target));//не те координаты
                                this.cardfield.removeChild(this.cardfield.children[card]);
                                this.wrapper.splice(card, 1);
                                setTimeout(callback, 1001);
                            };
                            Emit(() => {
                                bus.emit('ONMOUSEUP', {
                                    playerIndex: 0,
                                    card,
                                    cellIndex
                                });
                            });
                            console.log('cardfield', this.wrapper)
                            console.warn('bla', this.cardfield.children)
                            console.log('cardnumber', card);
                        }
                        else {
                            ca.setAttribute('style', '');
                            //ca.setAttribute('transition', 'all 30s easy-in-out');
                            child[card].appendChild(ca);
                            console.log('state', state);
                            console.log('CHILD', child[card]);
                            console.log('CHILD2', child);
                        }

                        // if (state[0].line4.length === 0 || state[1].line4.length === 0) {
                        //     bus.emit('ROUND');
                        // }

                    } else {
                        ca.setAttribute('style', '');
                        //ca.setAttribute('transition', 'all 30s easy-in-out');
                        child[card].appendChild(ca);
                        console.log('CHILD', child[card]);
                        console.log('CHILD2', child);
                    }
                    //e.target.onmousedown = null;
                    //child[card].onmousedown = null;
                };

                e.target.ondragstart = () => {
                    return false;
                };

                function getCoords(element) {
                    let box = element.getBoundingClientRect();
                    return {
                        left: box.left + pageXOffset,
                        right: box.right + pageXOffset,
                        top: box.top + pageYOffset,
                        bottom: box.bottom + pageYOffset
                    };
                }

            });
        });
    }

    render(state) {
        if (this.cardfield.children.length === 0) {
            state.forEach((player, playerIndex) => {
                if (playerIndex === 0) {
                    player.line4.forEach((card, cardIndex) => {
                        const cardEl = this.createCardImg(card.type, card.score);
                        console.log('this.wrapper[i]', this.wrapper[cardIndex]);
                        this.wrapper[cardIndex].appendChild(cardEl);
                        this.cardfield.appendChild(this.wrapper[cardIndex]);
                    });
                }
                if (playerIndex === 1) {
                    player.line4.forEach((card, cardIndex) => {
                        const cardEl = this.createCardImg(card.type, card.score);
                        console.log('this.wrapper[i]', this.wrapper[cardIndex]);
                        this.computerWrapper[cardIndex].appendChild(cardEl);
                        this.computerCardfield.appendChild(this.computerWrapper[cardIndex]);
                    });
                }
            });
            this.userScoreField.innerHTML = 'Очков за раунд: ' + state[0].roundScores +
                '<br/><br/>Выигранно раундов:  ' + state[0].roundWin;
            this.compScoreField.innerHTML = 'Очков за раунд: ' + state[1].roundScores +
                '<br/><br/>Выигранно раундов:  ' + state[1].roundWin;
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
//};

