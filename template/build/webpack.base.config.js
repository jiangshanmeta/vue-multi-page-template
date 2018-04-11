function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV;

const path = require('path');
const webpack = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let config = require("../config");

let HtMLPlugins = [];
let entries = {};

let plugins = [];

const router = require("../config/router");

Object.keys(router).forEach((pageDir)=>{
    let itemConfig = router[pageDir];

    let finalConfig;

    if(typeof itemConfig === 'object'){
        if(itemConfig.hasOwnProperty('entry')){
            // TODO 配置化 pages目录
            itemConfig.entry = resolve('src/pages/' + itemConfig.entry);
        }else{
            itemConfig.entry = resolve('src/pages/' + pageDir + '.js');
        }
        finalConfig = Object.assign({},{filename:pageDir},itemConfig);
    }else{
        finalConfig = {
            filename:pageDir,
            entry:resolve('src/pages/' + itemConfig),
        }
    }

    plugins.push(new HTMLWebpackPlugin({
        filename:`${finalConfig.filename}.html`,
        template:"index.html",
        inject: true,
        chunksSortMode: 'dependency',
        chunks: [finalConfig.filename,'vendor','manifest'],
        // TODO 提取公共模块
        // chunks:[pageDir,'commons'],
    }));

    entries[finalConfig.filename] = finalConfig.entry;
});


plugins = plugins.concat([
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
            )
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    }),
]);

module.exports = {
    entry:entries,
    output:{
        path:config[env].assetsRoot,
        filename:path.posix.join(config[env].assetsSubDirectory,'js/[name].[chunkhash].js'),
        publicPath:config[env].assetsPublicPath,
        chunkFilename:path.posix.join(config[env].assetsSubDirectory,'js/[id].[chunkhash].js'),
    },
    resolve: {
        extensions: ['.js', '.vue','.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:"vue-loader",
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src')
                ],
            },


        ],

    },
    plugins:plugins.concat(HtMLPlugins),
}