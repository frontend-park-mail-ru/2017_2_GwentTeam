'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const fallback = require('express-history-api-fallback');

app.use(express.static('public'));
app.use(fallback('index.html', { root: 'public' }));
app.use(express.static('public'));
app.use(cors({
    origin: true,
    credentials: true,
}));

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
