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
                },{
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
                    let arrayOfCards = data.cards;   //
                    let player = data.player;        //
                    console.log(arrayOfCards);
                    arrayOfCards.forEach((card, cardIndex) => {
                        this.wrapper.push(document.createElement('div'));
                        this.wrapper[cardIndex].setAttribute('class', 'cardfield__wrapper');
                        this.cardfield.appendChild(this.wrapper[cardIndex]);
                        const cardEl = this.createCardImg(card.type, card.score);

                        if (player.playerName === 'User') {
                            this.cardfield.children[cardIndex].appendChild(cardEl);//когда два, не заполняется, потому что удаляются wrapper
                        }

                        player.line4.push({
                            type: card.type,
                            score: card.score,
                            domEl: cardEl,
                            parentEl: this.cardfield.children[cardIndex],
                            index: card.index
                        });

                        this.drag(cardEl, player.line4[cardIndex], cardIndex);
                        // cardEl.onmousedown = (event) => {
                        //     console.warn('result', this.drag(card, cardIndex, event));
                        //     // let result = (() => {
                        //     //    return this.drag(card, cardIndex, event);
                        //     // });
                        //     // result()
                        //     //     .then((res) => {
                        //     //         if (res === true) {
                        //     //             cardEl.onmousedown = null;
                        //     //             bus.emit('CHOOSECARD', {card});
                        //     //         }
                        //     //     });////////////
                        //     // let result = ((callback) => {
                        //     //     let res = this.drag(card, cardIndex, event);
                        //     //     console.log('res', res);
                        //     //     //setTimeout(callback(res), 3000);
                        //     //     callback(res);
                        //     // });
                        //     // console.log('card', card);
                        //     // result((res) => {
                        //     //     if (res === true) {
                        //     //         cardEl.onmousedown = null;
                        //     //         bus.emit('CHOOSECARD', {card});
                        //     //     }
                        //     // });
                        //     //const result = this.drag(card, cardIndex, event);
                        //     // if (result === true) {//because result = undefined
                        //     //     cardEl.onmousedown = null;
                        //     //     bus.emit('CHOOSECARD', {card});
                        //     // }
                        //     }


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

      drag(cardEl, card, cardIndex) {
        let number = cardEl.parentNode;
          cardEl.onmousedown = (e) => {
              //console.log('ku1');
              let shiftX = null;
              let shiftY = null;
              console.log('cardEl', getCoords(e.target));
              const target = e.target;
              target.style.cursor = "pointer";
              target.setAttribute('class', 'cardfield__card-img__mousedown');

              console.log('car', target, card);
              let coords = getCoords(target);
              shiftX = e.pageX - coords.left;
              shiftY = e.pageY - coords.top;
              target.style.position = 'absolute';


              //document.body.appendChild(cardEl);
              moveAt(e);

              function moveAt(e) {
                  target.style.left = e.pageX - shiftX + 'px';
                  target.style.top = e.pageY - shiftY + 'px';
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
              target.onmouseup = (d) => {
                  console.log('kuup');
                  document.onmousemove = null;
                  d.target.onmouseup = null;
                  console.log('cords', getCoords(this.lines[5]));
                  const needFirstCoords = getCoords(this.lines[5]);
                  const needSecondCoords = getCoords(this.lines[3]);
                  if ((d.pageX >= needFirstCoords.left && d.pageX <= needFirstCoords.right)
                      && (d.pageY >= needFirstCoords.top && d.pageY <= needSecondCoords.bottom)) {
                      console.log('ku1');

                      Object.keys(this.lines).forEach((el, elIndex) => {
                          console.log(this.lines[0], this.lines[el])
                          const lineCoords = getCoords(this.lines[el]);
                          if ((d.pageX >= lineCoords.left && d.pageX <= lineCoords.right)
                              && (d.pageY >= lineCoords.top && d.pageY <= lineCoords.bottom)) {

                              if (elIndex === 5 && card.type === 'b') {
                                  target.setAttribute('style', '');
                                  bus.emit('CHOOSECARD', {card});
                                  console.log('metka', this.cardfield, this.wrapper, cardIndex)
                                   this.cardfield.removeChild(card.parentEl);
                                   this.wrapper.splice(cardIndex, 1);
                                  cardEl.onmousedown = null;
                                  return true;
                              }
                              if (elIndex === 4 && card.type === 'c') {
                                  target.setAttribute('style', '');
                                  bus.emit('CHOOSECARD', {card});
                                  this.cardfield.removeChild(card.parentEl);
                                  this.wrapper.splice(cardIndex, 1);
                                  console.log('metka', this.cardfield, this.wrapper, cardIndex)
                                  cardEl.onmousedown = null;
                                  return true;
                              }
                              if (elIndex === 3 && card.type === 'd') {
                                  target.setAttribute('style', '');
                                  bus.emit('CHOOSECARD', {card});
                                  this.cardfield.removeChild(card.parentEl);
                                  this.wrapper.splice(cardIndex, 1);
                                  console.log('metka', this.cardfield, this.wrapper, this.cardfield.children[cardIndex])
                                  cardEl.onmousedown = null;
                                  return true;
                              } else {
                                  target.setAttribute('style', '');
                                  target.setAttribute('class', 'cardfield__card-img');
                                  this.cardfield.children[cardIndex].appendChild(target);
                                  cardEl.onmousedown = null;
                                  return false;
                              }
                          }
                      });
                  } else {
                      target.setAttribute('style', '');
                      target.setAttribute('class', 'cardfield__card-img');
                      this.cardfield.children[cardIndex].appendChild(target);
                  }
                  console.log('end');
              }

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
          }
      }

        userGo(data) {
          this.state[0].line4.forEach((card, cardIndex) => {
                if (card.index === data.index) {
                    console.log('card', card);
                  card.domEl.remove();
                  console.log('card', card)
                  this.pushCardInLine(this.userInnerGamefield, card, cardIndex);
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
              this.pushCardInLine(this.opponentInnerGamefield, card);
              this.pushCardInState(this.state[1], card);
            this.state[1].roundScores += card.score;
            this.state[1].line4.splice(cardIndex, 1);
        }
      })
      this.printScore({userScore: this.state[0].roundScores,
                   userRounds: this.state[0].roundWin,
                   opponentScore: this.state[1].roundScores,
                   opponentRounds: this.state[1].roundWin});
    }

        createArrayOfCards(deck, cardsCount){
          console.log('dealCards');
          let arrayOfCards = [];
          for(let i = 0; i < cardsCount; i++) {
                  const cardIndex = Math.floor(Math.random() * deck.length);
                  arrayOfCards.push(deck[cardIndex]);
                  deck.splice(cardIndex, 1);
              }
          return arrayOfCards;
        }

        dealCards(player, deck, cardsCount) {
          let arr = this.createArrayOfCards(deck, cardsCount);
          bus.emit('DEALCARDS', {player: player, cards: arr});
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
            }
            else {
              this.state[1].roundWin += 1;
            }

            this.state[0].roundScores = 0;
            this.state[1].roundScores = 0;
            bus.emit('ROUND', {userScore: this.state[0].roundScores,
                         userRounds: this.state[0].roundWin,
                         opponentScore: this.state[1].roundScores,
                         opponentRounds: this.state[1].roundWin});

            this.cleanBoard();
            this.cleanState(this.state[0]);
            this.cleanState(this.state[1]);
              if (this.isGameOver()) {
                this.gameOver();
              }
              else {
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
