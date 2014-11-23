require([
    'jquery',
    'underscore',
    'garbochess-wrapper',
    'chessboard',
    'garbochess',
    'bootstrap'
], function ($, _, GarboWrapper, Board, Garbochess, Bootstrap) {
    var board = new ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
    });
    var wrapper = new GarboWrapper();
    wrapper.test();
});