require([
    'jquery',
    'underscore',
    'garbochess-wrapper',
    'chessboard',
    'garbochess',
    'chess',
    'bootstrap'
], function ($, _, GarboWrapper, Board, Engine, Garbochess, Bootstrap) {
    var inputelm = $("#fen-input");
	var analysisCounter = 0;
    var game = new Chess();
    var config = {
        draggable: true,
        position: 'start',
        showNotation: true,
        onDrop: function(source, target, piece, newPos, oldPos, orientation) {

            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // TODO: If move is legal and promotion, display options
            });

            // illegal move
            if (move === null) {
                return 'snapback';
            } else {
                inputelm.val(game.fen());
				GarboWrapper.setFen(game.fen());
				GarboWrapper.analyze();
            }
            console.log(game.fen());
            updateStatus();

        },
        onDragStart: function(source, piece, position, orientation) {
            if (game.game_over() === true ||
                (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        },
        onSnapEnd: function() {
            board.position(game.fen());
        }

    };

    var board = new ChessBoard('board', config);
    inputelm.val(board.fen());

    var updateStatus = function() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }
    };

    inputelm.on('input', function (event) {

        var input = inputelm.val();
        // TODO: Add support for full FEN String I.E. rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1
        var FENregex = new RegExp("^\\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\\s[bw]\\s(-|K?Q?k?q?)");
        if (_.isEmpty(input)){
            inputelm.css("background-color", "white");
        }else if(input.match(FENregex)){
            board.position(input, true);
            inputelm.css("background-color", "white");
			GarboWrapper.setFen(input);
			GarboWrapper.analyze();
        }else {
            inputelm.css("background", "rgba(255, 0, 0, 0.5)");
        }
    });
	
    $("#reset-position-btn").click(function (event) {
        board.start(true);
        game.reset();
        inputelm.val(board.fen());
    });
	
	GarboWrapper.onAnalysis(function (moves) {
		moves.sort(function (a, b) { return (game.turn() == "w" ? 1 : -1) * (b.score - a.score); });
		analysisCounter += 1;
		var output = analysisCounter + ": " + new Date() + "\n";
		moves.forEach(function (x) {
			output += "[" + x.score + "] " + x.readable + "\n";
		});
		$("#garbo-output").val(output);
	});

});