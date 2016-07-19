var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  path.resolve(__dirname, 'view/main.js'),
    output: {
        path:       path.resolve(__dirname, "public/javascripts"),
        filename:   'index.js',
        publicPath: path.resolve(__dirname, '/public')
    },

    module: {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'react-hot-loader', 'babel' ]
            }
        ]
    }
};