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
// const ids = {};
//
// app.post('/join', function (req, res) {
//     const password = req.body.password;
//     const login = req.body.login;
//     const email = req.body.email;
//     //const age = req.body.age;
//     if (
//         !password || !email ||
//         !password.match(/^\S{2,}$/) ||
//         !email.match(/@/)
//     //||
//     //!(typeof age === 'number' && age > 10 && age < 100)
//     ) {
//         return res.status(400).json({error: 'Не валидные данные пользователя'});
//     }
//     if (users[email]) {
//         return res.status(400).json({error: 'Пользователь уже существует'});
//     }
//
//     const id = uuid();
//     const user = {login, password, email, score: 0};
//     ids[id] = login;
//     users[login] = user;
//
//     res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
//     res.status(201).json({id});
// });
//
// app.post('/auth', function (req, res) {
//     const login = req.body.login;
//     const password = req.body.password;
//
//     if (!password || !login) {
//         return res.status(400).json({error: 'Не указан E-Mail или пароль'});
//     }
//     if (!users[login] || users[login].password !== password) {
//         return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
//     }
//
//     const id = uuid();
//     ids[id] = login;
//
//     res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
//     res.status(201).json({id});
// });
//
// app.get('/auth', function (req, res) {
//     const id = req.cookies['podvorot'];
//     const email = ids[id];
//     if (!email || !users[email]) {
//         return res.status(401).end();
//     }
//
//     users[email].score += 1;
//
//     res.json(users[email]);
// });

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

app.listen(port);
