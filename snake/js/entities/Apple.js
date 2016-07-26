SNAKE.Apple = function(x, y) {
    this.square = new SNAKE.Square(x, y, 'red');
};

SNAKE.Apple.prototype = {

    render: function() {
        this.square.render();
    }

}