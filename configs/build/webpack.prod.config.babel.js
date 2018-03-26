import webpack from 'webpack';
import Es3ify from 'es3ify-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackBase from './webpack.base.config.babel.js';

const argv = require('yargs').argv;

const version = argv.version || 'snapshot';

const webpackProd = {
    devtool: 'nosource-source-map',
    cache: true,
    entry: {
        'scripts/app.mount.min': [
            './src/journeys/app/app.mount.jsx',
            './src/sass/layouts/app/brand.scss'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: './',
        path: path.join(__dirname, '../../dist-release/brand/content/' + version + '/')
    },
    module: {
        rules: [],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?' + JSON.stringify({ cacheDirectory: true })]
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loaders: ['json-loader']
            },
            {
                test: /\.(eot|svg|ttf|TTF|woff|woff2)$/,
                include: path.resolve(__dirname, '../../../../src/assets/fonts'),
                loaders: 'file-loader?name=fonts/[path][name].[ext]&pathPublic=../&context=./src/assets/fonts'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/img'),
                loaders: 'file-loader?name=img/[path][name].[ext]&pathPublic=../&context=./src/assets/img'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/inline/img'),
                loaders: 'url-loader?limit=100000?name=img/[path][name].[ext]&pathPublic=../&context=./src/assets/inline/img'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/icons'),
                loaders: 'file-loader?name=icons/[path][name].[ext]&pathPublic=../&context=./src/assets/icons'
            },
            {
                test: /\.(scss|sass|css)$/,
                loaders: [
                    ExtractTextPlugin.extract('style-loader', { publicPath: './css'}),
                    'css-loader?root=/',
                    'resolve-url-loader',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new Es3ify(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                sequences: false,
                dead_code: false,
                conditionals: false,
                booleans: false,
                unused: false,
                if_return: false,
                join_vars: false,
                drop_console: false,
                screw_ie8: false
            },
            mangle: { screw_ie8: false },
            mangleProperties: { screw_ie8: false },
            output: { screw_ie8: false },
            sourceMap: false
        }),
        new ExtractTextPlugin('css/main.bundle.css', {
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/journeys/app/app.ejs',
            filename: 'index.html',
            hash: false,
            inject: true,
            compile: true,
            favicon: './src/assets/icons/favicon.ico',
            minify: false,
            cache: true,
            showErrors: true,
            chunks: 'all',
            excludeChunks: [],
            title: 'Brand Page Title',
            xhtml: false,
            props: {
                title: 'Brand Page Title',
                brandName: 'Brand',
                basePath: '/',
                scoutPath: 'content/' + version + '/'
            }
        })
    ]
};

export default merge.smart(webpackBase, webpackProd);
