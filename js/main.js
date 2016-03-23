$(document).ready(function(){
	var params = { 
		width: 800, 
		height: 600 
	}
	var elem = document.getElementById('container');
	var Engine = Two;
	var drawEngine = new DrawEngine(Engine, elem, params);


	var rect1 = new Rectangle(drawEngine, {
		position: {
			x: 100,
			y: 100
		},
		width: 100,
		height: 200,
		color: 'red',
		border: {
			width: 3,
			color: 'green'
		}
	});
	rect1.draw();
	setTimeout(function(){
		rect1.move(50, 10);

		setTimeout(function(){

			rect1.remove();
		}, 2000)
	}, 2000);

	two.update();
});


var Rectangle = function(drawEngine, params){
	this.de = drawEngine;
	this.position = {
		x: params.position.x,
		y: params.position.y
	}
	this.width = params.width;
	this.height = params.height;
	this.color = params.color;
	this.border = {
		width: params.border.width,
		color: params.border.color
	}
}


Rectangle.prototype.draw = function(){
	this.it = this.de.makeRectangle(this.position.x, this.position.y, this.width, this.height);
	this.it.fill = this.color;
	this.it.linewidth = this.border.width;
	this.it.stroke = this.border.color;
}

Rectangle.prototype.move = function(x, y){
	this.it.translation.x += x;
	this.it.translation.y += y;
	this.de.update();
}

Rectangle.prototype.remove = function(){
	this.de.remove(this.obj);
	this.de.update();
}

var DrawEngine = function(Engine, el, params){
	this.it = new Engine(params).appendTo(el);
}