require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },
    paths: {
        'chessboard': 'libs/chessboard',
        'garbochess': 'libs/garbochess',
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