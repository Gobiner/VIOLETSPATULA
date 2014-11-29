define ([
	'underscore',
	'garbochess'
], function (_, GarboChess) {
	var isInited = false;
	var analysisCallback = function() { };
	var backgroundEngine;
	var GarboWrapper = {

		moduleProperty: 1,
		init: function () {
		
			backgroundEngine = new Worker("js/libs/garbochess.js");
			isInited = true;
			
			backgroundEngine.onmessage = function (e) {
				if (e.data.match("^pv") == "pv") {
					var pv = e.data.substr(3, e.data.length - 3);
				} else if (e.data.match("^message") == "message") {
					var message = e.data.substr(8, e.data.length - 8);
				} else if (e.data.match("^analysis") == "analysis") {
					var data = JSON.parse(e.data.substr(9, e.data.length - 9));
					analysisCallback(data);
				} else if (e.data.match("^[a-h][1-8]{2}[bqnr]?") !== null) {
					var move = e.data;
				} else {
					GarboWrapper.sendError(e);
				}
			};
		},
		sendError: function (e) {
			console.error("Error from garbochess: " + e);
		},
		setFen: function(fenString) {
			if(backgroundEngine) {
				backgroundEngine.terminate();	
			}
			GarboWrapper.init();
			backgroundEngine.postMessage("position " + fenString);
		},
		analyze: function() {
			if(!isInited) { GarboWrapper.init(); }
			backgroundEngine.postMessage("analyze");
		},
		reset: function () {
			backgroundEngine.terminate();
			isInited = false;
		},
		onAnalysis: function (callback) {
			analysisCallback = callback;
		}
	}
	return GarboWrapper;
	
});
