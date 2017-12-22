'use strict';

import './menu.styl';
import UserService from '../../services/user-service.js';
import BaseView from '../../modules/view.js';
import menuTemplate from './menu.pug';
import bus from '../../modules/event-bus.js';
import Loader from '../../modules/loader.js';
import Deck from '../../game-components/deck/deck.js';
import Block from '../../modules/block.js';

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
        this.render();
        if (userService.user === null) {
            //this.initPopUp();
        }
        super.resume();
    }

    initPopUp(){
    //     this.popup = document.getElementById('popup');
    //     this.deck = new Deck();
    //     this.wrapperMan = new Block(null, {attrs: {class: 'deck__rect__wrapperMan'}});
    //     this.wrapperMonster = new Block(null, {attrs: {class: 'deck__rect__wrapperMonster'}});
    //
    //     this.imageMan = new Block(null, {attrs: {class: 'card-lg-monster-arachas1_transform'}});
    //     this.imageMonster = new Block(null, {attrs: {class: 'card-lg-monster-arachas2_transform'}});
    //     this.wrapperMan.addEl(this.imageMan);
    //     this.wrapperMonster.addEl(this.imageMonster);
    //
    //     this.deck.addEl(this.wrapperMan);
    //     this.deck.addEl(this.wrapperMonster);
    //
    //     this.deck.addToDocument();
    //     this.deck.hide();
    //     this.popup.onclick = (() => {
    //         this.deck.show();
    //         this.imageMan.el.onclick = (() => {
    //             //bus.//TODO вброс в шину
    //             this.deck.hide();
    //             this.deck.hideEl();
    //             this.router.go('/singleplayer');
    //             this.popup.onclick = null;
    //         });
    //         this.imageMonster.el.onclick = (() => {
    //             //bus.//TODO вброс в шину
    //             this.deck.hide();
    //             this.deck.hideEl();
    //             this.router.go('/singleplayer');
    //             this.popup.onclick = null;
    //         });
    //     });
    }
}
