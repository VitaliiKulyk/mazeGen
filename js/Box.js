var Box = function(params){
    var id = _.uniqueId('box');
    var open = true;
    this.x = params.x;
    this.y = params.y;
    this.id = _.identity(id);
    this.isOpen = _.identity(open);

    this.close = function(){
        open = false;
    }
}
