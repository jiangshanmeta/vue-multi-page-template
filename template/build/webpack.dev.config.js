let webpack = require('webpack');
let merge = require('webpack-merge');

let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let webpackBaseConfig = require("./webpack.base.config");

Object.keys(webpackBaseConfig.entry).forEach(function (name) {
    webpackBaseConfig.entry[name] = ['./build/dev-client'].concat(webpackBaseConfig.entry[name])
})



module.exports = merge(webpackBaseConfig,{
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
    ],
})