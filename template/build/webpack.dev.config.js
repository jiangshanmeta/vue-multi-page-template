let webpack = require('webpack');
let merge = require('webpack-merge');

let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let webpackBaseConfig = require("./webpack.base.config");

Object.keys(webpackBaseConfig.entry).forEach(function (name) {
    webpackBaseConfig.entry[name] = ['./build/dev-client'].concat(webpackBaseConfig.entry[name])
});

let utils = require('./utils');

const env = process.env.NODE_ENV;
let config = require("../config");

module.exports = merge(webpackBaseConfig,{
    module:{
        rules:utils.styleLoaders({ sourceMap: config[env].sourceMap })
    },
    devtool: '#cheap-module-eval-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
    ],
})