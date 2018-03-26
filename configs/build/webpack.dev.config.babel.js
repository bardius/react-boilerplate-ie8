import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackBase from './webpack.base.config.babel.js';

const webpackDev = {
    devtool: 'inline-source-map',
    debug: true,
    displayErrorDetails: true,
    outputPathinfo: true,
    entry: {
        'scripts/app.mount': [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9001/',
            'webpack/hot/only-dev-server',
            './src/journeys/app/app.mount.jsx',
            './src/sass/layouts/app/brand.scss'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: './',
        path: path.join(__dirname, '../../dist/brand/')
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
                loaders: 'url-loader?limit=100000?name=fonts/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/img'),
                loaders: 'url-loader?limit=100000?name=img/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/inline/img'),
                loaders: 'url-loader?limit=100000?name=img/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(gif|jpg|jpe?g|svg|png)$/,
                include: path.resolve(__dirname, '../../../../src/assets/icons'),
                loaders: 'url-loader?limit=100000?name=icons/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(scss|sass|css)$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'resolve-url-loader',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BABEL_ENV: JSON.stringify('development')
            }
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
                basePath: '/'
            }
        })
    ]
};

export default merge.smart(webpackBase, webpackDev);
