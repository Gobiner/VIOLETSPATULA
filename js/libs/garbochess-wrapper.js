define ('GarboWrapper',[
	'underscore',
	'garbochess'
], function (_, GarboChess) {
	var isInited = false;
	var GarboWrapper = {

		modulePropery: 1,
		init: function () {

			var backgroundEngine = new Worker("js/libs/garbochess.js");

			backgroundEngine.onmessage = function (e) {
				console.log("garbo wrapper received: " + e.data);
				if (e.data.match("^pv") == "pv") {
					var pv = e.data.substr(3, e.data.length - 3);
					console.log("pv " + pv);
				} else if (e.data.match("^message") == "message") {
					var message = e.data.substr(8, e.data.length - 8);
					console.log("message " + message);
				} else if (e.data.match("^[a-h][1-8]{2}[bqnr]?") !== null) {
					var move = e.data;
					console.log("move " + move);
				} else {
					this.sendError(e);
				}
			};
		},
		sendError: function (e) {
			alert("Error from garbochess: " + e.message);
		},
		setFen: function(fenString) {
			if(!isInited) { this.init(); }
			backgroundEngine.postMessage("position " + fenString);
		},
		analyze: function() {
			if(!isInited) { this.init(); }
			backgroundEngine.postMessage("analyze");
		}
		reset: function () {
			backgroundEngine.terminate();
			isInited = false;
		}

	return GarboWrapper;

});
