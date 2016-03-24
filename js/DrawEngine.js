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

	var move = function(obj, x, y){
		obj.translation.y += y;
		obj.translation.x += x;
		this.render();
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
		move: move,
		remove: remove
	}
}
