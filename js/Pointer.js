var Pointer = function(params){
	this.startPosition = params.startPosition;

	var currentPosition = {
		x: this.startPosition.x,
		y: this.startPosition.y
	};

	var rectangle  = de.drawRectangle({
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

	this.getHistory = function(){
		return history;
	};
	this.getCurrentPosition = function(){
		return currentPosition;
	}

	this.rectangle = function(){
		return rectangle;
	}
	this.move = function(newBox){
		currentPosition.x = newBox.x;
		currentPosition.y = newBox.y;

		history.push(_.clone(currentPosition));
	};
}
