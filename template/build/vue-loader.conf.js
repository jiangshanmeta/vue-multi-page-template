let utils = require('./utils');
let config = require('../config');

const env = process.env.NODE_ENV;

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap:config[env].sourceMap,
        extract: config[env].extractCSS,
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
