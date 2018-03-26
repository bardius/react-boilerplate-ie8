import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

import endpointConfig from '../endpoints';

const autoprefixer = require('autoprefixer');
const filterGradient = require('postcss-filter-gradient');
const cssnano = require('cssnano');

export default {
    ie8Test: true,
    resolve: {
        root: path.resolve('./src'),
        modulesDirectories: [
            path.resolve('./node_modules')
        ],
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            actions: path.resolve(__dirname, '../../src/actions'),
            components: path.resolve(__dirname, '../../src/components'),
            constants: path.resolve(__dirname, '../../src/constants'),
            containers: path.resolve(__dirname, '../../src/containers'),
            factories: path.resolve(__dirname, '../../src/factories'),
            journeys: path.resolve(__dirname, '../../src/journeys'),
            locales: path.resolve(__dirname, '../../src/locales'),
            reducers: path.resolve(__dirname, '../../src/reducers'),
            sass: path.resolve(__dirname, '../../src/sass'),
            services: path.resolve(__dirname, '../../src/services'),
            store: path.resolve(__dirname, '../../src/store'),
            utilities: path.resolve(__dirname, '../../src/utilities')
        }
    },
    module: {
        rules: []
    },
    sassLoader: {
        includePaths: [
            "node_modules"
        ]
    },
    postcss: [
        autoprefixer({
            browsers: ['last 3 versions', 'not ie < 8']
        }),
        filterGradient(),
        cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        })
    ],
    performance: {
        hints: false // warning
    },
    plugins: [
        new webpack.DefinePlugin({
            'webpack': JSON.stringify({
                title: 'Brand Page Title',
                brandName: 'Brand',
                basePath: '/',
                endpoints: endpointConfig
            })
        }),
        new webpack.ProvidePlugin({
            promise: 'es6-promise-promise'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/index.html',
                to: 'index.html'
            },
            {
                from: 'src/assets/mocks',
                to: 'mocks'
            },
            {
                from: 'node_modules/react-polyfill/dist/react-polyfill.min.js',
                to: 'scripts/react-polyfill.min.js'
            }
        ])
    ]
}
