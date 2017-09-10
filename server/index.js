'use strict';
const express = require("express");
const app = express();
var fs = require('fs');


app.use(express.static("public"));

//app.get('game.html', (req, res) => {
//	res.send('game_page');
//});

//app.get('*', (req, res) => {
//	res.send('404');
//});



app.listen(process.env.PORT || '8080', () => {
    console.log('server is working');
});