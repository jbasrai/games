SNAKE.Square = function(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
};

SNAKE.Square.prototype = {

    render: function() {
        var ctx = game.ctx;
        var pixels = game.grid.toPixelCoords(this.x, this.y);

        ctx.fillStyle = this.color;
        ctx.fillRect(
            pixels.x, 
            pixels.y, 
            game.pointSize,
            game.pointSize
        );
    }

};