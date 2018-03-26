import webpackDev from './webpack.dev.config.babel.js';
import webpackProd from './webpack.prod.config.babel.js';
import webpackDevServer from './../server/webpack.dev.server.config.js';
import eslint from './eslint.config.js';

export default {
    webpackDevConfigs: webpackDev,
    webpackProdConfigs: webpackProd,
    webpackServerConfigs: webpackDevServer,
    eslintConfig: eslint
}
