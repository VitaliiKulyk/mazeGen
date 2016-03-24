var de,
	boxSize = 50,
	skip = boxSize/2 + 10;
$(document).ready(function(){
	var params = {
		width: 800,
		height: 600
	}


	var elem = document.getElementById('container');
	var Engine = Two;
	de = new DrawEngine(Engine, elem, params);

	 var field = generateField({
		 xCount: 15,
		 yCount: 10
	 });

	var wall = mazeBuilder.drawWall(field[1], field[2])

	var pointer = new Pointer({
		startPosition: field[0]
	});
});


var generateField = function(params){
	var field = _.flatten(_.map(new Array(params.xCount), function(v1, x){
		return _.map(new Array(params.yCount), function(v1, y){
			return new Box({x: x, y: y});
		});
	}));

	_.each(field, function(box){
		var boxParams = {
			position: {
				x: box.x * boxSize + skip,
				y: box.y * boxSize + skip
			},
			width: boxSize,
			height: boxSize,
			color: 'red',
			border: {
				width: 2,
				color: 'black'
			}
		}
		box.rectangle = de.drawRectangle(boxParams);
	});
	return field;
}
