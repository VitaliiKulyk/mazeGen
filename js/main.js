var gParams = {
	boxSize: 50,
	skip: 50/2 + 10,
	field: {
	 	xCount: 36,
	 	yCount: 18
	}
}

var de;


$(document).ready(function(){
	var params = {
		width: 1820,
		height: 920
	}

	var elem = document.getElementById('container');
	var Engine = Two;
	de = new DrawEngine(Engine, elem, params);

	var mE = new MazeEngine({
	 	field: gParams.field,
	 	startPosition: {
	 		x: 0,
	 		y: 0
	 	}
	});

	mE.build();
});