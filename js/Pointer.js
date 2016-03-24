var Pointer = function(params){
	this.startPosition = params.startPosition;

	var currentPosition = {
		x: this.startPosition.x,
		y: this.startPosition.y
	};

	this.rectangle  = de.drawRectangle({
		position: {
			x: currentPosition.x * gParams.boxSize + gParams.skip,
			y: currentPosition.y * gParams.boxSize + gParams.skip
		},
		width: gParams.boxSize,
		height: gParams.boxSize,
		color: 'blue',
		border: {
			width: 1,
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
