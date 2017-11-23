'use strict';

/**
* GameStrategy
* @name GameStrategy
* @class GameStrategy
*/
export default class GameStrategy {
    constructor(router, el) {
        //console.log('GameStrategy.constructor');
        this.router = router;
        this.el = el;

        this.gameEl = document.createElement('div');
        this.gameEl.setAttribute('class', 'game-view');
        this.el.appendChild(this.gameEl);

        //let html = document.documentElement;
        //this.fullscreen(html);
        this.profilefield = document.createElement('div');
        this.profilefield.setAttribute('class', 'game-view__profilefield');
        this.gameEl.appendChild(this.profilefield);

        this.btnExitEl = document.createElement('div');
        this.btnExitEl.setAttribute('class', 'profilefield__btn-exit');
        this.btnExitEl.innerHTML = 'В главное меню';
        this.profilefield.appendChild(this.btnExitEl);

        this.btnExitEl.onclick = () => {
            this.router.go('/');
        };

        this.boardEl = document.createElement('div');
        this.boardEl.setAttribute('class', 'game-view__game-board');
        this.gameEl.appendChild(this.boardEl);

        this.userGamefield = [];
        this.userInnerGamefield = [];
        this.opponentInnerGamefield = [];
        this.opponentGamefield = [];

        for (let i = 0; i < 3; i++) {
          this.opponentGamefield.push(document.createElement('div'));
          this.opponentInnerGamefield.push(document.createElement('div'));
          this.userInnerGamefield.push(document.createElement('div'));
          this.userGamefield.push(document.createElement('div'));
        }

        this.opponentInnerGamefield.forEach((field) => { //TODO в один цикл for
            field.setAttribute('class', 'board-item__inneritem');
        });

        this.userInnerGamefield.forEach((field) => {
            field.setAttribute('class', 'board-item__inneritem');
        });

        this.opponentGamefield.forEach((field, fieldIndex) => {
            field.setAttribute('class', 'game-board__board-item');
            field.appendChild(this.opponentInnerGamefield[fieldIndex]);
            this.boardEl.appendChild(field);
        });

        this.userGamefield.forEach((field) => {
          field.setAttribute('class', 'game-board__board-item');
        });
        for (let i = 2; i >= 0; i--) {
          this.userGamefield[i].appendChild(this.userInnerGamefield[i]);
          this.boardEl.appendChild(this.userGamefield[i]);
        }



        this.lines = [];
        this.lines = this.opponentGamefield.concat(this.userGamefield);
        console.log('lines', this.lines);

        this.cardfield = document.createElement('div');
        this.cardfield.setAttribute('class', 'game-view__cardfield');

        this.wrapper = [];

        for (let i = 0; i < 8; ++i) {
            this.wrapper.push(document.createElement('div'));
            this.wrapper[i].setAttribute('class', 'cardfield__wrapper');
            this.cardfield.appendChild(this.wrapper[i]);
        }

        this.boardEl.appendChild(this.cardfield);

        this.compScoreField = document.createElement('div');
        this.compScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.compScoreField);

        this.btnPassEl = document.createElement('div');
        this.btnPassEl.setAttribute('class', 'profilefield__btn-pass');
        this.btnPassEl.setAttribute('value', 'ПАС');
        this.btnPassEl.innerText = 'ПАС';
        this.profilefield.appendChild(this.btnPassEl);

        this.userScoreField = document.createElement('div');
        this.userScoreField.setAttribute('class', 'profilefield__score');
        this.profilefield.appendChild(this.userScoreField);

        this.printScore({
          userScore: 0,
          userRounds: 0,
          opponentScore: 0,
          opponentRounds: 0
        })

    }

    createCardImg(type, score) {
        const cardEl = document.createElement('img');
        const src = './img/cards/' + type + score + '.jpg';
        cardEl.setAttribute('src', src);
        cardEl.setAttribute('class', 'cardfield__card-img');
        return cardEl;
    }

    printScore(score) {
      this.userScoreField.innerHTML = 'Очков за раунд: ' + score.userScore +
      '<br/><br/>Выиграно раундов:  ' + score.userRounds;
      this.compScoreField.innerHTML = 'Очков за раунд: ' + score.opponentScore +
      '<br/><br/>Выиграно раундов:  ' + score.opponentRounds;
    }

    showResult(isUserWin) {
      if (isUserWin) {
        alert('Вы выиграли!');
      }
      else {
        alert('Вы проиграли:(');
      }
    }

    pushCardInLine(arrayOfLines, card, cardIndex) {
      if (card.type === 'b') {
        arrayOfLines[2].appendChild(card.domEl);
      }
      if (card.type === 'c') {
        arrayOfLines[1].appendChild(card.domEl);
      }
      if (card.type === 'd') {
        arrayOfLines[0].appendChild(card.domEl);
      }
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

    cleanState(playerState) {
      playerState.line1 = [];
      playerState.line2 = [];
      playerState.line3 = [];
    }

    cleanBoard() {
      this.userGamefield.forEach((elem) => this.removeChildren(elem));
      this.opponentGamefield.forEach((elem) => this.removeChildren(elem));
    }

    removeChildren(elem) {
      while (elem.lastChild) {
         elem.removeChild(elem.lastChild);
      }
    }
}
