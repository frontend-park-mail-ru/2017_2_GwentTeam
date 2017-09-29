'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));

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
