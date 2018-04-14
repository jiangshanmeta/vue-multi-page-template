function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV;

const path = require('path');
const webpack = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let config = require("../config");

// 处理 define配置项
const defineBaseConfig = require("../config/define.base.config.js");
const defineEnvConfig = require(`../config/define.${env}.config.js`);
const defineMergeConfig = Object.assign({},defineBaseConfig,defineEnvConfig);
Object.keys(defineMergeConfig).forEach((key)=>{
    defineMergeConfig[key] = JSON.stringify(defineMergeConfig[key]);
});


let HtMLPlugins = [];
let entries = {};

let plugins = [
    new webpack.DefinePlugin(defineMergeConfig),

];

// 处理多页面入口

const router = require("../config/router");

const routerDefault = {
    template:"index.html",
}

// router 可以配置项 entry template
Object.keys(router).forEach((pageDir)=>{
    let itemConfig = router[pageDir];

    if(typeof itemConfig === 'object'){
        if(!itemConfig.entry){
            itemConfig.entry = pageDir;
        }
    }else{
        itemConfig = {
            entry:itemConfig,
        }
    }

    itemConfig.filename = pageDir;
    itemConfig.entry = resolve('src/pages/' + itemConfig.entry);

    const finalConfig = Object.assign({},routerDefault,itemConfig);

    plugins.push(new HTMLWebpackPlugin({
        filename:`${finalConfig.filename}.html`,
        template:finalConfig.template,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: [finalConfig.filename,'vendor','manifest'],
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
        filename: '[name].js',
        publicPath:config[env].assetsPublicPath,
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
                test: /\.md$/,
                loader: 'raw-loader',
            },

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
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:path.posix.join(config[env].assetsSubDirectory,'img/[name].[hash:7].[ext]'),
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:path.posix.join(config[env].assetsSubDirectory,'media/[name].[hash:7].[ext]'),
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name:path.posix.join(config[env].assetsSubDirectory,'fonts/[name].[hash:7].[ext]'),
                }
            }

        ],

    },
    plugins:plugins.concat(HtMLPlugins),
}