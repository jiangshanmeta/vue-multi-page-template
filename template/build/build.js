process.env.NODE_ENV = 'prod';

let rm = require('rimraf');
let path = require('path');
let webpack = require("webpack");

let config = require("../config");
let webpackConfig = require("./webpack.prod.config");

rm(config.prod.assetsRoot,(e)=>{
    if(e){
        throw err;
    }

    webpack(webpackConfig,(e,stats)=>{
        if(e){
            throw e;
        }
        
        process.stdout.write(stats.toString({
            colors:true,
            modules:false,
            children:false,
            chunks:false,
            chunkModules:false,
        }) + '\n\n');

        

    })
});
