SNAKE.Collisions = function(snake, apple, callback) {

    this.snake = snake;
    this.apple = apple;
    this.callback = callback;

}

SNAKE.Collisions.prototype = {

    update: function(dt) {
        var width = game.grid.gWidth;
        var height = game.grid.gHeight;
        var head = this.snake.squares[0];

        if (head.x < 0 || head.x >= width ||
            head.y < 0 || head.y >= height) {

            this.callback('WALL');
            return;
        }

        if (head.x === this.apple.square.x && 
            head.y === this.apple.square.y) {

            this.callback('APPLE');
            return;
        }

        this.snake.squares.slice(1).forEach(function(s) {
            if (head.x === s.x && head.y === s.y) {
                this.callback('SNAKE');
                return;
            }
        }.bind(this));
    }

}