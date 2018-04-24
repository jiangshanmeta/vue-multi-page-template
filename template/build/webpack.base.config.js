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

defineMergeConfig.BASEPATH = JSON.stringify(config[env].assetsPublicPath);

let HtMLPlugins = [];
let entries = {};

let plugins = [
    new webpack.DefinePlugin(defineMergeConfig),

];

// 处理多页面入口

const router = require("../config/router");

// const routerDefault = {
//     template:"index.html",
// }

const routerDefault = require("../config/html");

// router 可以配置项 entry template

router.forEach((routerItem)=>{
    const finalConfig = Object.assign({},routerDefault,routerItem);

    // 入口路径修改为绝对路径
    finalConfig.entry = resolve('src/pages/' + finalConfig.entry);

    // console.log(finalConfig.title)

    plugins.push(new HTMLWebpackPlugin({
        filename:`${finalConfig.filename}.html`,
        template:finalConfig.template,
        inject: true,
        title:finalConfig.title,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: [finalConfig.filename,'vendor','manifest'].concat(finalConfig.chunks || []),
    }));

    entries[finalConfig.filename] = finalConfig.entry;
});


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
                options:require('./vue-loader.conf'),
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