var gParams = {
	boxSize: 50,
	skip: 50/2 + 10,
	field: {
	 	xCount: 15,
	 	yCount: 10
	}
}

var de;


$(document).ready(function(){
	var params = {
		width: 800,
		height: 600
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

	//var wall = mazeBuilder.drawWall(field[1], field[2])

	mE.build();

	//de.moveToBoxPosition(pointer, field[4])
});