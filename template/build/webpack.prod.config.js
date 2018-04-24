let webpack = require('webpack');
let merge = require('webpack-merge');
let path = require("path");

let webpackBaseConfig = require("./webpack.base.config");
let config = require("../config");

const env = process.env.NODE_ENV;

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let utils = require('./utils');

let webpackFinalConfig = merge(webpackBaseConfig,{
    module: {
        rules: utils.styleLoaders({
            sourceMap: config[env].sourceMap,
            extract: true
        })
    },
    devtool:config[env].sourceMap ? 'source-map' : false,
    output:{
        filename:path.posix.join(config[env].assetsSubDirectory,'js/[name].[chunkhash].js'),
        chunkFilename:path.posix.join(config[env].assetsSubDirectory,'js/[id].[chunkhash].js'),
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                ) || (
                    // 提取公共css
                    module.resource &&  /\.css$/.test(module.resource) && count>1

                )
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

    
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename:path.posix.join(config[env].assetsSubDirectory,'css/[id].[contenthash].css'),
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
});

if (config[env].bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackFinalConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackFinalConfig;