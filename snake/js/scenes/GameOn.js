SNAKE.GameOn = function() {

    this.snake = new SNAKE.Snake();

    this.spawnApple();

    this.collisions = new SNAKE.Collisions(
        this.snake,
        this.apple,
        this.collisionHandler.bind(this)
    );

    game.globalState.score = this.getScore();

};

SNAKE.GameOn.prototype = {

    spawnApple: function() {
        var x = Math.floor(Math.random() * game.grid.gWidth);
        var y = Math.floor(Math.random() * game.grid.gHeight);

        if (this.apple) {
            this.apple.square.x = x;
            this.apple.square.y = y;
        } else {
            this.apple = new SNAKE.Apple(x, y);
        }
    },

    getScore: function() {
        return this.snake.squares.length - 2;
    },

    update: function(dt) {
        this.snake.update(dt);
        this.collisions.update(dt);
    },

    collisionHandler: function(type) {
        switch (type) {
            case 'WALL':
                this.onWallCollide();
                break;
            case 'APPLE':
                this.onAppleCollide();
                break;
            case 'SNAKE':
                this.onSnakeCollide();
                break;
        }
    },

    onAppleCollide: function() {
        this.snake.grow();
        this.spawnApple();
        game.globalState.score = this.getScore();
    },

    onWallCollide: function() {
        game.setScene(SNAKE.GameOver);
    },

    onSnakeCollide: function() {
        game.setScene(SNAKE.GameOver);
    },

    render: function() {
        var ctx = game.ctx;
        var canvas = ctx.canvas;

        /* draw background */
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '142px Helvetica';
        ctx.fillText(game.globalState.score, canvas.width / 2, canvas.height / 2);

        /* draw entities */
        this.snake.render();
        this.apple.render();
    }
}