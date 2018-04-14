process.env.NODE_ENV = 'dev';

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')

const webpackConfig = require('./webpack.dev.config');
const config = require("../config");

const port = config[process.env.NODE_ENV].port;



let app = express();

let compiler = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath:webpackConfig.output.publicPath,
    quiet:true
});

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    heartbeat: 2000
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
            cb()
    })
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve
let readyPromise = new Promise(resolve => {
    _resolve = resolve
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
    opn(uri);
    _resolve();
});

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}