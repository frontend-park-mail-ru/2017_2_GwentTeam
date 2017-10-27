'use strict';

const express = require('express');
const app = express();
const fallback = require('express-history-api-fallback');

app.use(express.static('build'));
app.use(fallback('index.html', { root: 'build' }));

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`Server listening port ${port}`);
});
