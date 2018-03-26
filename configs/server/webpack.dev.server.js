var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var chalk = require('chalk');

var serverConfig = require('./webpack.dev.server.config.js');
var devConfig = require('../build/webpack.dev.config.babel.js');

chalk.enabled = true;
chalk.level = 3;

try {
    var protocol = serverConfig.protocol || 'http';
    var host = serverConfig.host || 'localhost';
    var port = serverConfig.port || 9001;
    var compiler = webpack(devConfig);
    var devServer = new webpackDevServer(compiler, serverConfig);

    devServer.listen(port, host, function(error) {
        if (error) {
            console.log(chalk.red(error));
            process.exit(1);
        }
        console.log(chalk.green('The server has started at: ' + protocol + '://' +  host + ':' +  port));
    });
}
catch(error) {
    console.log(chalk.red(error));
}
