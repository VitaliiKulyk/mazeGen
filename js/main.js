var gParams = {
	boxSize: 50,
	skip: 50/2 + 10
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
	 	field: {
		 	xCount: 15,
		 	yCount: 10
	 	},
	 	startPosition: {
	 		x: 0,
	 		y: 0
	 	}
	});

	//var wall = mazeBuilder.drawWall(field[1], field[2])

	console.log(mE)
	mE.build();

	//de.moveToBoxPosition(pointer, field[4])
});

var MazeEngine = function(params){
	var generateField = function(fieldParams){
		var field = _.flatten(_.map(new Array(fieldParams.xCount), function(v1, x){
			return _.map(new Array(fieldParams.yCount), function(v1, y){
				var box  = new Box({x: x, y: y});

				var boxParams = {
					position: {
						x: box.x * gParams.boxSize + gParams.skip,
						y: box.y * gParams.boxSize + gParams.skip
					},
					width: gParams.boxSize,
					height: gParams.boxSize,
					color: 'red',
					border: {
						width: 1,
						color: 'black'
					}
				}

				box.setRectangle(de.drawRectangle(boxParams));

				console.log('fu')

				return box;
			});
		}));
		return field;
	}

	var build = function(){
		var i = 0;
			var f = function(){
				if (i < 5){
					var d = field[_.random(0, field.length)];
					de.movePointerToBoxPosition(pointer, d);
					++i;
				}
				else 
					clearInterval(f);
			}
			setInterval(f, 1000);
	}

	var field = generateField(params.field);

	var pointer = new Pointer({
		startPosition: params.startPosition
	});

	var startField = _.find(field, function(item){
		return (item.x == params.startPosition.x && item.y == params.startPosition.y)
	})


	this.pointer = _.identity(pointer);
	this.field = _.identity(field);
	this.build = build;

}



