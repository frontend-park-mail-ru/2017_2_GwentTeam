'use strict';

const express = require('express');
//const body = require('body-parser');
//const cookie = require('cookie-parser');
//const morgan = require('morgan');
//const uuid = require('uuid/v4');
const app = express();

//app.use(morgan('dev'));
app.use(express.static('public'));
//app.use(body.json());
//app.use(cookie());


const users = {
    'vasya@mail.ru': {
        email: 'vasya@mail.ru',
        password: 'password',
        score: 10,
    },
    'petya@mail.ru': {
        email: 'petya@mail.ru',
        password: 'password',
        score: 1000,
    },
    'nika@mail.ru': {
        email: 'nika@mail.ru',
        password: 'password',
        score: 500000,
    }
};


app.get('/users', function (req, res) {
    const scorelist = Object.values(users)
        .sort((l, r) => r.score - l.score)
        .map(user => {
            return {
                email: user.email,
                score: user.score,
            };
        });

    res.json(scorelist);
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
