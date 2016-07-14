/**
 * Created by Marcelo on 7/13/16.
 */

module.exports = function ( request, response, next ) {

    var start  = +new Date(),
        stream = process.stdout,
        url    = request.url,
        method = request.method;

    response.on('finish', function () {
        var duration = +new Date() - start;
        var message  = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
        stream.write(message);

    });


    next();

};