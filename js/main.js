require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'garbochess-wrapper': {
            deps: ['garbochess']
        }
    },
    paths: {
        'chessboard': 'libs/chessboard',
        'garbochess': 'libs/garbochess',
		'garbochess-wrapper': 'libs/garbochess-wrapper',
        'chess'     : 'libs/chess',
        'jquery'    : 'libs/jquery',
        'bootstrap' : 'libs/bootstrap',
        'underscore': 'libs/underscore',
        'App'       : 'app'
    }
});

require([
    'App'
], function(App) {
    console.log("Cool");
});