let webpack = require('webpack');
let merge = require('webpack-merge');

let webpackBaseConfig = require("./webpack.base.config");

module.exports = merge(webpackBaseConfig,{
    plugins:[

    ],
})