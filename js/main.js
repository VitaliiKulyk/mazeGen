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

var MazeEngine = function(params){

	var getRelatedBoxesPosition = function(position){
		return [
			{
				x: position.x,
				y: position.y + 1
			},
			{
				x: position.x,
				y: position.y - 1
			},
			{
				x: position.x + 1,
				y: position.y 
			},
			{
				x: position.x - 1,
				y: position.y
			}
		];
	}

	var getPossibleRoute = function(position){
		var related = getRelatedBoxesPosition(position);
		var result = [];
		_.each(related, function(pos){
			var box = _.find(field, function(item){
				return (item.x == pos.x && item.y == pos.y);
			});
			if (box && box.isOpen())
				result.push(box);
		});
		return result;
	}



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
				return box;
			});
		}));
		return field;
	}

	var build = function(){
		var makeStep = function(){
			var currentPosition = pointer.getCurrentPosition();
			var posibleRoutes = getPossibleRoute(currentPosition);
			
			var boxToMove;
			if (_.isEmpty(posibleRoutes)){
				var history = pointer.getHistory();
				var index = _.indexOf(history, _.find(history, function(item){
					return (item.x == currentPosition.x && item.y == currentPosition.y);
				}));
				var pos = history[index-1];
				boxToMove = _.find(field, function(item){
					return (item.x == pos.x && item.y == pos.y);
				});
			}
			else {
				boxToMove = posibleRoutes[_.random(0, posibleRoutes.length -1)];
			}
			de.movePointerToBoxPosition(pointer, boxToMove);
		}


		var start = function(){
			var i = 0;
			var step = setInterval(function(){
				if (pointer.getHistory().length !== gParams.field.xCount * gParams.field.xCount){
					makeStep();
				}
				else {
					console.log('finish');
					stop();
				}
			}, 100);
			var stop = function(){
				clearInterval(step);
			}
		}

		start();
	}

	var field = generateField(params.field);

	var pointer = new Pointer({
		startPosition: params.startPosition
	});

	var startField = _.find(field, function(item){
		return (item.x == params.startPosition.x && item.y == params.startPosition.y)
	});

	startField.close();


	this.pointer = _.identity(pointer);
	this.field = _.identity(field);
	this.build = build;
}