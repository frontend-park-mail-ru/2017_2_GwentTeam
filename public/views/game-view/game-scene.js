import Card from './game-card.js';

export default class GameScene {
    constructor(gamefield, cardfield) {
        console.log('game-scene construct');

        const img = new Card(4, 'b', cardfield);   //TODO рандомное создание карт
        const img1 = new Card(6, 'b', cardfield);
        const img2 = new Card(8, 'd', cardfield);
        const img3 = new Card(10, 'c', cardfield);
        /*const userCards = [];
        userCards.push(img);
        userCards.push(img1);
        userCards.push(img2);
        userCards.push(img3);

        const userLines = [
            {
                count: 0,
                scoreCount:0
            },
            {
                count: 0,
                scoreCount: 0
            },
            {
                count: 0,
                scoreCount: 0
            }
        ];

        const compLines = [
            {
                count: 0,
                scoreCount:0
            },
            {
                count: 0,
                scoreCount: 0
            },
            {
                count: 0,
                scoreCount: 0
            }
        ];

        let userScore = 0;
        userLines.forEach((elem) => {
            userScore += elem.scoreCount;
        });
        console.log(userScore);*/


        this.render();
    }

    render() {
        console.log('game-scene render');
        //this.card = new Card('./cards/b4.jpg', 0, "1", this);
    }

}
