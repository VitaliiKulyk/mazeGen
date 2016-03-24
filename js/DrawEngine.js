var DrawEngine = function(Engine, el, params){
	var engine = new Engine(params).appendTo(el);

	var drawRectangle = function(params){
		var result = engine.makeRectangle(params.position.x, params.position.y, params.width, params.height);
		result.fill = params.color;
		result.linewidth = (params.border && params.border.width) || null;
		result.stroke = (params.border && params.border.color) || null;
		engine.render();
		return result;
	}

	var moveObj = function(obj, x, y){
		obj.translation.x = x + gParams.skip;
		obj.translation.y = y + gParams.skip;
		render();
	}

	var moveBox = function(obj, x, y){
		moveObj(obj.rectangle(), x * gParams.boxSize, y * gParams.boxSize);
	}

	var movePointerToBoxPosition = function(pointer, targetBox){
		pointer.move(targetBox);
		moveBox(pointer, targetBox.x, targetBox.y);
		targetBox.close();
	}

	var render = function(){
		engine.update();
	}

	var remove = function(obj){
		engine.remove(obj);
		engine.update();
	}

	return {
		drawRectangle: drawRectangle,
		render: render,
		moveBox: moveBox,
		moveObj: moveObj,
		movePointerToBoxPosition: movePointerToBoxPosition,
		remove: remove
	}
}
