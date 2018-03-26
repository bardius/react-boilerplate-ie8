const webpack = require('webpack');
const Es3ify = require('es3ify-webpack-plugin');
const path = require('path');

module.exports = {
    ie8Test: true,
    devtool: 'nosource-source-map',
    cache: true,
    resolve: {
        root: path.join(__dirname, '../'),
        modulesDirectories: [
            'node_modules'
        ],
        extensions: ['', '.js']
    },
    module: {
        rules: [],
        loaders: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?' + JSON.stringify({ cacheDirectory: true,  presets: ['env'] })]
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loaders: ['json-loader']
            }
        ]
    },
    performance: {
        hints: false // warning
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('production')
            }
        }),
        new Es3ify(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            beautify: true,
            comments: true,
            compress: false,
            mangle: { screw_ie8: false },
            mangleProperties: { screw_ie8: false },
            output: { screw_ie8: false },
            sourceMap: false
        }),
        new webpack.ProvidePlugin({
            promise: 'es6-promise-promise'
        })
    ]
}
