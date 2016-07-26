SNAKE.GameOver = function() {

    if (!game.globalState.score) {
        game.globalState.score = 0;
    }

};

SNAKE.GameOver.prototype = {

    update: function(dt) {
        var SPACE = game.globalState.keysDown[' '];

        if (SPACE) {
            game.setScene(SNAKE.GameOn);
        }
    },

    render: function() {
        var ctx = game.ctx;
        var canvas = ctx.canvas;

        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '142px Helvetica';
        ctx.fillText(game.globalState.score, canvas.width / 2, canvas.height / 2);

        ctx.font = '36px Helvetica';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height - 10);
    }

}