const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const argv = require('yargs').argv;
const merge = require('merge-stream');
const mkdirp = require('mkdirp');
const dotProp = require('dot-prop-immutable');
const webpackStream = require('webpack-stream');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

chalk.enabled = true;
chalk.level = 3;

let packageConfig = {
    brands: [
        'brand'
    ],
    channels: [
        'EMEA',
        'APAC'
    ],
    appName: 'app',
    artifact: null,
    srcFolder: './dist-release/',
    outputFolder: './target/',
    scoutFileSrc: './configs/packaging/scout.template.js',
    scoutFileConfig: './configs/packaging/scout.webpack.config',
    contentPaths: [
        'fonts/**',
        'img/**',
        'icons/**',
        'css/**',
        'scripts/**',
        'mocks/**',
        '*.*'
    ],
    scoutHtmlPath: [
        '*.html'
    ]
};

const scoutFileConfig = require(packageConfig.scoutFileConfig);

const normalizeValue = (value) => value || '';

const alias = (getAppPath, channel, brand) => ({
    'variables': getAppPath(channel, brand, './config/variables.json')
});

const extendScoutWebpackConfig = (config, channel, brand) => {
    return dotProp.merge(config, 'resolve.alias', {
        'variables': '../../' + getAppPath(channel, brand, './config/variables.json')
    });
};

const mapToBrands = (callback) => {
    return packageConfig.brands.map((brand) => {
        return packageConfig.channels.map((channel) => {
            return callback(brand, channel);
        });
    });
};

const getPathsForBrand = (function(argv){
    const version = (argv.version || 'snapshot').toString();
    return (brand, channel, scoutFileOnly) => {
        const getDistPaths = (trailingPath) => path.join(
            packageConfig.srcFolder,
            brand,
            'content',
            version,
            normalizeValue(trailingPath)
        );
        return scoutFileOnly ?
            packageConfig.scoutHtmlPath.map(getDistPaths)
            : packageConfig.contentPaths.map(getDistPaths);
    };
})(argv);

const getVersionPath = (function(argv){
    const version = (argv.version || 'snapshot').toString();
    return (channel, brand, trailingPath) => getAppPath(
        channel,
        brand,
        path.join('content', version, normalizeValue(trailingPath))
    );
})(argv);

const getScoutPath = (function(argv){
    return (channel, brand, trailingPath) => getAppPath(
        channel,
        brand,
        path.join(normalizeValue(trailingPath))
    );
})(argv);

const getAppPath = (function(argv){
    return (channel, brand, trailingPath) => {
        return path.join(
            packageConfig.outputFolder,
            channel,
            brand,
            packageConfig.appName,
            normalizeValue(trailingPath)
        );
    }
})(argv);

gulp.task('set-channels', (done) => {
    const artifact = argv.artifact || packageConfig.artifact;
    if(artifact){
        packageConfig.channels = [
            artifact
        ]
    }
    done();
});

gulp.task('clean', (done) => {
    return gulp.src([packageConfig.outputFolder])
        .pipe(clean())
        .on('error', (error) => {
            console.error(error);
            done();
        });
});

gulp.task('create-folders', (done) => {
    return Promise.all(
        mapToBrands((brand, channel) => {
            return new Promise (function(resolve, reject) {
                try {
                    mkdirp(getAppPath(channel, brand, 'config'));
                    mkdirp(getAppPath(channel, brand, 'content'));
                    resolve();
                }
                catch(error) {
                    console.error(error);
                    done();
                }
            });
        })
    );
});

gulp.task('copy-contents', (done) => {
    const version = (argv.version || 'snapshot').toString();
    return merge.apply(merge, mapToBrands((brand, channel) => {
        return gulp.src(
            getPathsForBrand(brand, channel, false),
            { base: path.join(packageConfig.srcFolder, brand, 'content', version) }
        ).pipe(
            gulp.dest(getVersionPath(channel, brand, null))
        ).on('error', (error) => {
            console.error(error);
            done();
        });
    }));
});

gulp.task('copy-scout-html', (done) => {
    return merge.apply(merge, mapToBrands((brand, channel) => {
        return gulp.src(
            getPathsForBrand(brand, channel, true),
            { base: path.join(packageConfig.srcFolder, brand) }
        ).pipe(
            replace(`data-channel="EMEA"`, `data-channel="${channel}"`)
        ).pipe(
            gulp.dest(getScoutPath(channel, brand, null))
        ).pipe(
            rename('index.html')
        ).pipe(
            gulp.dest(getAppPath(channel, brand, null))
        ).on('error', (error) => {
            console.error(error);
            done();
        });
    }));
});

gulp.task('build-config', (done) => {
    return Promise.all(
        mapToBrands((brand, channel) => {
            return new Promise (function(resolve, reject) {
                const configJson = {
                    releasePath: `${packageConfig.appName}/content/`,
                    version: argv.version || 'snapshot',
                    environment: argv.env || 'prod',
                    channel: channel,
                    brand: brand,
                    appName: packageConfig.appName
                };

                try {
                    fs.writeFile(
                        getAppPath(channel, brand, '/config/variables.json'),
                        JSON.stringify(configJson, null, '  '),
                        function(error) {
                            if(error) {
                               throw error;
                            }
                        }
                    );
                    resolve();
                }
                catch(error) {
                    console.error(error);
                    done();
                }
            })
        })
    );
});

gulp.task('generate-scout', (done) => {
    return merge.apply(merge, mapToBrands((brand, channel) => {
        return gulp.src(packageConfig.scoutFileSrc)
            .pipe(
                webpackStream(extendScoutWebpackConfig(scoutFileConfig, channel, brand))
            )
            .pipe(
                rename('index.js')
            )
            .pipe(
                gulp.dest(getVersionPath(channel, brand, null))
            )
            .pipe(
                rename('index.js')
            )
            .pipe(
            gulp.dest(getAppPath(channel, brand, null))
            )
            .on('error', (error) => {
                console.error(error);
                done();
            });
    }));
});

gulp.task('package', gulpSequence(
    'clean',
    'set-channels',
    'create-folders',
    'copy-contents',
    'copy-scout-html',
    'build-config',
    'generate-scout'
));



