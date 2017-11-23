'use strict';

import Strategy from './strategy.js';
import bus from '../../../modules/event-bus.js';
/**
 * @module GameView
 * @extends BaseView
 */
export default class MultiPlayerStrategy extends Strategy {
    constructor(router, el) {

        super(router, el);

        // const address = ['https', 'https:'].includes(location.protocol) ?
        //     `wss://${location.host}/ws` :
        //     `ws://${location.host}/ws`;
        // //console.log(address);
        //
        // this.ws = new WebSocket(address);
        // this.ws.onopen = function(event) {
        //     console.log(`WebSocket on address ${address} opened`);
        //     this.ws.send('StartGame');
        //     //console.log(this.ws);
        // }

        this.ws = new WebSocket('ws://localhost:8001/game');     //TODO
        this.ws.onmessage = function(event) {
            const message = JSON.parse(event.data);
            bus.emit(message.event, message.payload);
        };
        // ws.onerror = function(error) {
        //     console.log("Ошибка " + error.message);
        // };
        // ws.onclose = function(event) {
        //     if (event.wasClean) {
        //         console.log('Соединение закрыто');
        //     } else {
        //         console.log('Обрыв соединения');
        //     }
        //     console.log('Код: ' + event.code + ' причина: ' + event.reason);
        // };
        // ws.onopen = () => {
        //     this.ws.send(JSON.stringify({event:'startGame', payload: {}}));
        //
        //     this.btnPassEl.onclick = () => {
        //           this.ws.send(JSON.stringify({event:'pass', payload: {}}));
        //     };
        //
            this.state = {
                playerName: 'User',
                roundWin: 0,
                roundScores: 0,
                line1: [],
                line2: [],
                line3: [],
                line4: []
            };
        //
        //     this.ws.send(JSON.stringify({event:'dealCards', payload: {}}));
        //
            bus.on('DEALCARDS', (payload) => {
                const data = payload.payload;
                //console.log(data);
                data.forEach((card) => {
                    const cardEl = this.createCardImg(card.type, card.score);
                    this.cardfield.appendChild(cardEl);
                    this.state.line4.push({
                      type: card.type,
                      score: card.score,
                      domEl: cardEl,
                      index: card.index
                    });
                    const index = card.index;
                    cardEl.onclick = (e) => {
                        //console.log(e.target);
                        bus.emit('CHOOSECARD', { card });
                        e.target.onclick = null;
                        //console.log(card);
                    };
                })
            });
        //}

        bus.on('CHOOSECARD', (payload) => {
            const data = payload.payload.card;
            this.userGo(data);
            this.ws.send(JSON.stringify({
                event: 'userGo',
                payload: data.index
            }));
        });

        bus.on('OPPONENTGO', (payload) => {
            //console.log('opponentgo');
            const data = payload.payload; //&
            this.opponentGo(data.card);
            this.printScore(data.score);
        })
    //
    //     bus.on('ROUND', (payload) => {
    //         const data = payload.payload;
    //         //console.log(data);
    //         this.printScore(data);
    //     })
    //
    //     bus.on('GAMEOVER', (payload) => {
    //         const data = payload.payload;
    //         this.showResult(data);
    //     })
    // }
    //
}
    userGo(data){
        this.state.line4.forEach((card, cardIndex) => {
            if (card.index === data.index) {
                card.domEl.remove();
                this.pushCardInLine(this.userGamefield, card);
                this.pushCardInState(this.state, card);
                this.state.roundScores += card.score;
                this.state.line4.splice(cardIndex, 1);
            }
        })
    }

    opponentGo(card) {
        card.domEl = this.createCardImg(card.type, card.score);
        this.pushCardInLine(this.opponentGamefield, card);
    }

}
