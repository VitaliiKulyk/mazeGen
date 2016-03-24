var Pointer = function(params){
	this.startPosition = params.startPosition;
	var currentPosition = {
		x: this.startPosition.x,
		y: this.startPosition.y
	};

	var rectangle  = de.drawRectangle({
		position: {
			x: currentPosition.x * boxSize + skip,
			y: currentPosition.y * boxSize + skip
		},
		width: boxSize,
		height: boxSize,
		color: 'blue',
		border: {
			width: 3,
			color: 'black'
		}
	});
    
	var history = [_.clone(currentPosition)];
	this.getHistory = _.identity(history);
	this.getCurrentPosition = _.identity(currentPosition);
	this.move = function(newBox){
		currentPosition.x = newBox.x;
		currentPosition.y = newBox.y;
		history.push(_.clone(currentPosition));
	};
}
