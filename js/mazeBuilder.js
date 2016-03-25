var MazeEngine = function(params){

    var getRelatedBoxesPosition = function(position){
        return [
            {
                x: position.x,
                y: position.y + 1
            },
            {
                x: position.x,
                y: position.y - 1
            },
            {
                x: position.x + 1,
                y: position.y 
            },
            {
                x: position.x - 1,
                y: position.y
            }
        ];
    }

    var getPossibleRoute = function(position){
        var related = getRelatedBoxesPosition(position);
        var result = [];
        _.each(related, function(pos){
            var box = _.find(field, function(item){
                return (item.x == pos.x && item.y == pos.y);
            });
            if (box && box.isOpen())
                result.push(box);
        });
        return result;
    }



    var generateField = function(fieldParams){
        var field = _.flatten(_.map(new Array(fieldParams.xCount), function(v1, x){
            return _.map(new Array(fieldParams.yCount), function(v1, y){
                var box  = new Box({x: x, y: y});

                var boxParams = {
                    position: {
                        x: box.x * gParams.boxSize + gParams.skip,
                        y: box.y * gParams.boxSize + gParams.skip
                    },
                    width: gParams.boxSize,
                    height: gParams.boxSize,
                    color: 'red',
                    border: {
                        width: 1,
                        color: 'black'
                    }
                }

                box.setRectangle(de.drawRectangle(boxParams));
                return box;
            });
        }));
        return field;
    }

    var drawWall = function(box1, box2){
        if (box1 instanceof Pointer){
            box1.x = (box1.rectangle().translation.x - gParams.skip)/gParams.boxSize;
            box1.y = (box1.rectangle().translation.y - gParams.skip)/gParams.boxSize;
        }

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

        var x1 = box1.rectangle().translation.x,
            x2 = box2.rectangle().translation.x,
            y1 = box1.rectangle().translation.y,
            y2 = box2.rectangle().translation.y;

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

    var getBoxesByPositions = function(positions){
        var boxes = _.filter(field, function(box){
            var res = _.find(positions, function(position){
                return position.x === box.x  && position.y === box.y;
            });
            return res;
        });
        return boxes;
    }


    var getBoxesForWall = function(currentPosition){
        var related = getRelatedBoxesPosition(currentPosition);
        var previous = pointer.getPreviousStep();
        var positions = _.filter(related, function(item){
            if (previous)
                return !(item.x === previous.x && item.y === previous.y);
            return true;
        });
        var boxes = getBoxesByPositions(positions);
        var result = [];
        _.each(boxes, function(box){
            if (!box.isOpen())
                result.push(box);
        });
        return result;
    }

    var stop = function(){  //optimize it in future
        var stop = true;
        _.each(field, function(box){
            if (box.isOpen())
                stop = false;
        });
        return stop;
    }

    var build = function(){
        var makeStep = function(){
            var currentPosition = pointer.getCurrentPosition();
            var posibleRoutes = getPossibleRoute(currentPosition);

            var boxToMove;  var exit = false;
            if (_.isEmpty(posibleRoutes)){

                var history = pointer.getHistory();
                var index = _.indexOf(history, _.find(history, function(item){
                    return (item.x == currentPosition.x && item.y == currentPosition.y);
                }));
                var pos = history[index-1];
                boxToMove = _.find(field, function(item){
                    return (item.x == pos.x && item.y == pos.y);
                });
                exit = true;
            }
            else {
                boxToMove = posibleRoutes[_.random(0, posibleRoutes.length -1)];
            }

            var wallBoxes = getBoxesForWall(currentPosition);
            if (!_.isEmpty(wallBoxes)){
                _.each(wallBoxes, function(wallBox){
                    if (!exit)
                        drawWall(pointer, wallBox);
                });
            }

            de.movePointerToBoxPosition(pointer, boxToMove);
        }


        var start = function(interval){
            if (interval){
                var step = setInterval(function(){
                    if (!stop())
                        makeStep();
                    else {   
                        stopBuild();
                    }
                }, interval);
                var stopBuild = function(){
                    clearInterval(step);
                    console.log('finish');
                    de.movePointerToBoxPosition(pointer, {x:-2, y:-2});
                }
            }
            else {
                while(!stop())
                    makeStep();
                console.log('finish');
                de.movePointerToBoxPosition(pointer, {x:-2, y:-2});
            }
        }

        start(30);
    }

    var field = generateField(params.field);

    var pointer = new Pointer({
        startPosition: params.startPosition
    });

    var startField = _.find(field, function(item){
        return (item.x == params.startPosition.x && item.y == params.startPosition.y)
    });
    startField.close();

    this.pointer = function(){
        return pointer;
    }
    this.field = function(){
        return field;
    }
    this.build = build;
}