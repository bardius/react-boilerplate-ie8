import variables from 'variables';

(function(APP_SCOUT, window, document,undefined) {

    const getVersionFromUrl = function(queryParamName) {
        return (window.location.search.match(new RegExp('[?&]' + queryParamName + '=([^&]+)')) || [, null])[1];
    };
    const version = getVersionFromUrl(`${variables.appName}-app-version`) || variables.version;
    const releasePath = `${variables.releasePath}version`;

    APP_SCOUT.Config = {
        version,
        releasePath,
        headElement: document.getElementsByTagName('head')[0],
        bodyElement: document.getElementsByTagName('body')[0],
        isIE: navigator.appName === 'Microsoft Internet Explorer',
        jsAsset: '/scripts/app.mount.min.js',
        cssAsset: '/css/main.bundle.css',
        ie8Asset: '/scripts/ie8.min.js'
    };

    APP_SCOUT.App = {
        mount() {
            if(APP_SCOUT.Config.isIE){
                APP_SCOUT.App.mountIEAssets(APP_SCOUT.Utilities.getIEBrowserVersion());
            }

            APP_SCOUT.Utilities.appendAsset(
                `${APP_SCOUT.Config.releasePath}${APP_SCOUT.Config.cssAsset}`,
                `css`,
                APP_SCOUT.Config.headElement
            );

            APP_SCOUT.Utilities.appendAsset(
                `${APP_SCOUT.Config.releasePath}${APP_SCOUT.Config.jsAsset}`,
                `js`,
                APP_SCOUT.Config.bodyElement
            );
        },
        mountIEAssets(ieVersion) {
            if(ieVersion < 9){
                APP_SCOUT.Utilities.appendAsset(
                    `${APP_SCOUT.Config.releasePath}${APP_SCOUT.Config.ie8Asset}`,
                    `js`,
                    APP_SCOUT.Config.bodyElement
                );
            }
        }
    };

    APP_SCOUT.Utilities = {
        getIEBrowserVersion() {
            const getIEVersionRegex = new RegExp('MSIE ([0-9]{1,}[\.0.9]{0,})');
            return getIEVersionRegex.exec(navigator.userAgent) ? parseFloat(RegExp.$1) : 11;
        },
        appendAsset(src, type, target) {
            let asset = null;

            switch(type) {
                case 'css':
                    asset = document.createElement('link');
                    asset.type = 'text/css';
                    asset.rel = 'stylesheet';
                    asset.href = src;
                    break;
                case 'js':
                    asset = document.createElement('script');
                    asset.type = 'text/javascript';
                    asset.href = src;
                    break;
                default:
                    return;
            }

            if(asset){
                target.appendChild(asset)
            }
        }
    };

    APP_SCOUT.App.mount();

}(APP_SCOUT || {}, window, document));
