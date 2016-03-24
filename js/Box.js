var Box = function(params){
    var id = _.uniqueId('box');
    var open = true;
    var rectangle;

    this.x = params.x;
    this.y = params.y;

    this.id = _.identity(id);
    this.isOpen = function(){
        return open;
    }

    this.rectangle = function(){
        return rectangle;
    }   

    this.setRectangle = function(obj){
    	rectangle = obj;
    }

    this.close = function(){
    	rectangle.fill = 'yellow';
        open = false;
    }
}
