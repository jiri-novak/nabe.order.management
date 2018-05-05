var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    output: {
        path: helpers.root('wwwroot'),
        publicPath: 'dist/',
        filename: '[name].js',
        //chunkFilename: '[id].chunk.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
            }
        }),
    ],

    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        watchContentBase: true
    }
});