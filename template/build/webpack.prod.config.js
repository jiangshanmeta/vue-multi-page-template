let webpack = require('webpack');
let merge = require('webpack-merge');
let path = require("path");

let webpackBaseConfig = require("./webpack.base.config");
let config = require("../config");

const env = process.env.NODE_ENV;

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackBaseConfig,{
    output:{
        filename:path.posix.join(config[env].assetsSubDirectory,'js/[name].[chunkhash].js'),
        chunkFilename:path.posix.join(config[env].assetsSubDirectory,'js/[id].[chunkhash].js'),
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename:path.posix.join(config[env].assetsSubDirectory,'css/[name].[contenthash].css'),
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config[env].assetsSubDirectory,
                ignore: ['.*']
            }
        ])

    ],
})