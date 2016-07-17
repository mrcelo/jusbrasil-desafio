var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app = express();


var entities = require('./routes/entities');


app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());

// serve ./public folder
app.use(express.static(path.join(__dirname, 'public')));

// route entities api
app.use('/entities', entities);

// catch 404 and forward to error handler
app.use(function ( req, res, next ) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if ( app.get('env') === 'development' ) {
    app.use(function ( err, req, res, next ) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error:   err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function ( err, req, res, next ) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error:   {}
    });
});

// elastic.indexExists().then(function ( exists ) {
//     // if ( exists ) {
//     //     return elastic.deleteIndex();
//     // }
// }).then(function () {
//     return elastic.initIndex().then(elastic.initMapping()).then(function () {
//         //Add a few book titles for the autocomplete
//         //elasticsearch offers a bulk functionality as well, but this is for a different time
//         var promises = [
//             'Thing Explainer',
//             'The Internet Is a Playground',
//             'The Pragmatic Programmer',
//             'The Hitchhikers Guide to the Galaxy',
//             'Trial of the Clone',
//             'All Quiet on the Western Front',
//             'The Animal Farm',
//             'The Circle'
//         ].map(function ( title ) {
//             return elastic.addEntity({
//                 title:      title,
//                 entitytype: "TOPIC",
//                 metadata:   {
//                     titleLength: title.length
//                 }
//             });
//         });
//
//         return Promise.all(promises);
//     });
// });


module.exports = app;
