'use strict';

import './menu.styl';
import UserService from '../../services/user-service.js';
import BaseView from '../../modules/view.js';
import menuTemplate from './menu.pug';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';
import Deck from '../../game-components/deck/deck.js';
import ButtonDeck from '../../game-components/btn-deck/btn-deck.js';

const userService = new UserService();

/**
* Класс MenuView
* @module MenuView
* @extends BaseView
*/
export default class MenuView extends BaseView {
    start() {

        this.loader = new Loader();
        this.inPopupFlag = false;
        this.user = null;
        bus.on('user:authorized', ((data) => {
            this.loader.hideEl();
            this.user = data.payload;
            this.resume();
        }));
        bus.on('user:unauthorized', (() => {
            this.loader.hideEl();
            this.user = null;
            this.resume();
        }));

        this.resume();
    }

    render() {
        const data = {
            authorized: this.user !== null,
        };
        this.el.innerHTML = menuTemplate(data);
    }

    resume() {
        if (userService.isLoggedIn()) {
            this.user = userService.user;
        }
        if (userService.user === null) {
            console.log('ku');
            this.initPopUp();
        }
        this.render();
        super.resume();
    }

    initPopUp(){
        this.popup = document.getElementById('popup');
        this.deck = new Deck();
        this.btnDeck = new ButtonDeck();
        this.deck.addEl(this.btnDeck);
        document.body.appendChild(this.deck.el);
        this.deck.hide();
        if (this.popup !== null) {
            this.popup.onclick = (() => {
                this.deck.el.removeAttribute('hidden');
                this.deck.el.setAttribute('class', 'deck_active');
                this.deck.show();
                this.btnDeck.el.onclick = (() => {
                    // this.deck.el.addEventListener('onchange', () => {
                    //     alert('ku');

                    // });
                    let currentValue = document.getElementById('deck').value;
                    // let result = currentValue.options[currentValue.selectedIndex].value;//значение, т.е. либо teachers либо students
                    console.log('cur', currentValue);//чтобы получить сообщение(либо Нечисть либо Чуваки) надо currentValue.options[currentValue.selectedIndex].text
                    this.deck.hide();
                    this.router.go('/singleplayer');
                });
            });
        }
    }
}
