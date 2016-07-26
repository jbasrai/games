SNAKE.Game = function() {

    var canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 300;
    canvas.style.border = "1px solid black";

    document.body.appendChild(canvas);

    this.ctx = canvas.getContext("2d");

    this.pointSize = 10;

    this.globalState = {};

    this.globalState.keysDown = SNAKE.Input();

    this.setScene = this.setScene.bind(this);

    this.grid = new SNAKE.Grid(this.pointSize, canvas.width, canvas.height);

}


SNAKE.Game.prototype = {

    setScene: function(Scene) {
        var scene = new Scene();

        if (!this.scene) {
            this.scene = scene
        } else {
            this.nextScene = scene
        }
    },

    start: function() {
        this.setScene(SNAKE.GameOver);

        var before = Date.now()

        var loop = function() {
            var now = Date.now();
            var delta = now - before;
            var dt = delta / 1000;

            this.scene.update(dt);
            this.scene.render();

            this.scene = this.nextScene ? this.nextScene : this.scene;

            before = Date.now();

            requestAnimationFrame(loop);
        }.bind(this);

        loop();
    }

};