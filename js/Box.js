var Box = function(params){
    var id = _.uniqueId('box');
    var open = true;
    var rectangle;

    this.x = params.x;
    this.y = params.y;

    this.id = _.identity(id);
    this.isOpen = _.identity(open);
    this.rectangle = _.identity(rectangle);

    this.setRectangle = function(obj){
    	rectangle = obj;
    }

    this.close = function(){
    	rectangle.fill = 'yellow';
        open = false;
    }
}
