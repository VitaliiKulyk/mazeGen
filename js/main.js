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
	console.log(rect1)
	rect1.draw();
	setTimeout(function(){
		rect1.move(50, 10);

		setTimeout(function(){

			rect1.remove();
		}, 2000)
	}, 2000);

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
	var it = this.it;
	it = this.de.drawRectangle(this);
	it.fill = this.color;
	it.linewidth = this.border.width;
	it.stroke = this.border.color;
	this.de.render();
}

Rectangle.prototype.move = function(x, y){
	this.it.translation.x += x;
	this.it.translation.y += y;
	this.de.render();
}

Rectangle.prototype.remove = function(){
	this.de.remove(this.obj);
	this.de.render();
}

var DrawEngine = function(Engine, el, params){
	this.it = new Engine(params).appendTo(el);
}
DrawEngine.prototype.drawRectangle = function(rect){ 
	return this.it.makeRectangle(rect.position.x, rect.position.y, rect.width, rect.height);
}
DrawEngine.prototype.move = function(obj, x, y){
	
}
DrawEngine.prototype.render = function(){
	var it = this.it;
	it.update();
}
DrawEngine.prototype.remove = function(obj){
	this.it.remove(obj);
	this.render();
}
