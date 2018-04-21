let path = require("path");


module.exports = {
    prod:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/test/',
        bundleAnalyzerReport:true,
    },
    dev:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/',
        port:8080,
    },
}