define([
    'jquery',
    'underscore',
    'chessboard',
    'garbochess',
	'garbochess-wrapper',
    'bootstrap'
], function ($, _, Board, Garbochess, Bootstrap) {
    var board = new ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
    });
});