require([
    'jquery',
    'underscore',
    'garbochess-wrapper',
    'chessboard',
    'garbochess',
    'bootstrap'
], function ($, _, GarboWrapper, Board, Garbochess, Bootstrap) {
    var config = {
        draggable: true,
        position: 'start',
        showNotation: true
    };

    var board = new ChessBoard('board', config);

    $("#fen-submit").click(function (event) {
        var input = $("#fen-input").val();
        if(_.isEmpty(input)){
            alert("No FEN Supplied");
        }else {
            board.position(input, true);
        }

    });

});