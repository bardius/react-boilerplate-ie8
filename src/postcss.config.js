const autoprefixer = require('autoprefixer');
const postcssfiltergradient = require('postcss-filter-gradient');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['last 3 versions', 'not ie < 8']
        }),
        postcssfiltergradient,
        cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        })
    ]
};
