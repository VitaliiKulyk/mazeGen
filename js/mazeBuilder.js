var mazeBuilder = (function(){

    var drawWall = function(box1, box2){
    	var getWallSide = function() {
    		var difx = box1.x - box2.x,
    			dify = box1.y - box2.y;

    		var xDict = {
    			'-1': 'right',
    			'1': 'left'
    		};
    		var yDict = {
    			'-1': 'bottom',
    			'1': 'top'
    		};
    		return difx ? xDict[difx.toString()] : yDict[dify.toString()];
    	}

    	var x1 = box1.rectangle.translation.x,
    		x2 = box2.rectangle.translation.x,
    		y1 = box1.rectangle.translation.y,
    		y2 = box2.rectangle.translation.y;

    	var size = Math.abs(x1- x2 || y1 - y2);
    	var side = getWallSide();

    	var wallParams = {
    		bottom: {
    			position: {
    				x: x1,
    				y: y1 + size/2
    			},
    			width: size,
    			height: 5,
    			color: 'black'
    		},
    		top: {
    			position: {
    				x: x1,
    				y: y1 - size/2
    			},
    			width: size,
    			height: 5,
    			color: 'black'
    		},
    		left: {
    			position: {
    				x: x1 - size/2,
    				y: y1
    			},
    			width: 5,
    			height: size,
    			color: 'black'
    		},
    		right: {
    			position: {
    				x: x1 + size/2,
    				y: y1
    			},
    			width: 5,
    			height: size,
    			color: 'black'
    		}
    	}

    	return de.drawRectangle(wallParams[side]);
    }

    return {
        drawWall: drawWall
    }
})();
