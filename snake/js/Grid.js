SNAKE.Grid = function(pointSize, cWidth, cHeight) {

    this.pointSize = pointSize;

    this.cWidth = cWidth;
    this.cHeight = cHeight;

    this.gWidth = cWidth / pointSize;
    this.gHeight = cHeight / pointSize;
};

SNAKE.Grid.prototype = {

    toPixelCoords: function(x, y) {
        return {
            x: x * this.pointSize,
            y: y * this.pointSize
        }
    }

}