let webpack = require('webpack');
let merge = require('webpack-merge');

let webpackBaseConfig = require("./webpack.base.config");

module.exports = merge(webpackBaseConfig,{
    output:{
        filename:path.posix.join(config[env].assetsSubDirectory,'js/[name].[chunkhash].js'),
        chunkFilename:path.posix.join(config[env].assetsSubDirectory,'js/[id].[chunkhash].js'),
    },
    plugins:[

    ],
})