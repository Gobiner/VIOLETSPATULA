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
    var inputelm = $("#fen-input");

    console.log(board.fen());
    inputelm.on('input', function (event) {


        var input = inputelm.val();
        var FENregex = new RegExp("^\\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\\s[bw]\\s(-|K?Q?k?q?)");
        if (_.isEmpty(input)){
            inputelm.css("background-color", "white");
        }else if(input.match(FENregex)){
            board.position(input, true);
            inputelm.css("background-color", "white");
            inputelm.val("");
			GarboWrapper.setFen(input);
			GarboWrapper.analyze();
        }else {
            inputelm.css("background", "rgba(255, 0, 0, 0.5)");
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
	
	GarboWrapper.onAnalysis(function (moves) {
		console.log(moves);
	});
});