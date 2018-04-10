function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// const config = require('./config');

// const entry = resolve('src/main.js');

let HtMLPlugins = [];
let entries = {};

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

    HtMLPlugins.push(new HTMLWebpackPlugin({
        filename:`${finalConfig.filename}.html`,
        template:"index.html",
        // TODO 提取公共模块
        // chunks:[pageDir,'commons'],
    }));

    entries[finalConfig.filename] = finalConfig.entry;
});


let plugins = [
    new CleanWebpackPlugin(["../dist"]),
];


module.exports = {
    entry:entries,
    output:{
        filename:"js/[name].bundle.[hash].js",
        path:path.resolve(__dirname,'../dist'),
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