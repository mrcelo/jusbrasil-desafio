/*
 *   Created by Marcelo Nascimento Menezes.
 *   Description: Main express app
 *
 *
 * */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!!!');
});

app.get('/blocks', function (req, res) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    res.send(blocks);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});