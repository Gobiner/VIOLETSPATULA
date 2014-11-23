"use strict";

var $garbo = (function () {
	var garbo = {},
		backgroundEngine = new Worker("js/libs/garbochess.js");

	backgroundEngine.onmessage = function (e) {
		if(e.data.match("^pv") == "pv") {
			var pv = e.data.substr(3, e.data.length - 3);
			console.log("pv " + pv);
		} else if (e.data.match("^message") == "message") {
			var message = e.data.substr(8, e.data.length - 8);
			console.log("message " + message);
		} else if (e.data.match("^[a-h][1-8]{2}[bqnr]?") !== null) {
			var move = e.data;
			console.log("move " + move);
		} else {
			alert("Unhandled message from garbochess: " + e.data);
		}
	};
	
	backgroundEngine.error = function (e) {
		alert("Error from garbochess: " + e.message);
	};

	garbo.moduleProperty = 1;
	garbo.setFEN = function (fenString) {
		backgroundEngine.postMessage("position " + fenString);
	};
	garbo.analyze = function () {
		backgroundEngine.postMessage("analyze");
	}

	return garbo;
}());
