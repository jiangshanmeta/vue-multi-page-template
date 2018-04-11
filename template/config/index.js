let path = require("path");


module.exports = {
    prod:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/',
    },
    dev:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsPublicPath:'/',
    }
}