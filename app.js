/*
 *   Created by Marcelo Nascimento Menezes.
 *   Description: Main express app
 *
 *
 * */
var express = require('express');
var morgan  = require('morgan'); // HTTPRequest response time logger


var app = express();

app.use(morgan('dev'));
app.use(express.static('public'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
