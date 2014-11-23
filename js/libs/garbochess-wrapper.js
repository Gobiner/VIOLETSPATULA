define ('GarboWrapper',[
	'garbochess'
], function (GarboChess) {

	var GarboWrapper = {

		modulePropery: 1,
		init: function () {

			var backgroundEngine = new Worker("js/libs/garbochess.js");

			backgroundEngine.onmessage = function (e) {
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
			backgroundEngine.postMessage("position " + fenString);
		},
		analyze: function() {
			backgroundEngine.postMessage("analyze");
		}
	};

	console.log(GarboWrapper);
	return GarboWrapper;

});
