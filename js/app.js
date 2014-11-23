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

    console.log(GarboWrapper.moduleProperty);

    var board = new ChessBoard('board', config);
    var inputelm = $("#fen-input");

    console.log(board.fen());
    inputelm.change(function (event) {


        var input = inputelm.val();
        var FENregex = new RegExp("/^\\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\\s[bw]\\s(-|K?Q?k?q?)\\s(-|[a-h‌​][36])/");
        if (_.isEmpty(input)){
            inputelm.css("background", "red");
        }else if(input.match(FENregex)){
            board.position(input, true);
        }else {
            inputelm.css("background", "red");
        }
    });
    $("#fen-submit").click(function (event) {
        var input = $("#fen-input").val();
        if(_.isEmpty(input)){
            alert("No FEN Supplied");
        }else {
            board.position(input, true);
        }

    });

});