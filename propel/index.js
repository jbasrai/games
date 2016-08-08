(function() {

    /* set up canvas */
    var canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = "1px solid black";

    var ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);


    /* some classes */
    var Vec2 = function(x, y) {
        this.x = x;
        this.y = y;
    };

    var Ship = function(x, y) {
        this.pos = new Vec2(x, y);
        this.velocity = new Vec2(0, 0);
        this.acceleration = new Vec2(0, 0);

        this.direction = 0;
    };


    /* game state */
    var ship = new Ship(canvas.width / 2, canvas.height / 2);


    /* game loop */
    var update = function() {
    };

    var render = function() {
        /* background */
        ctx.fillStyle = "#E0A16D";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* ship */
        var shipX = ship.pos.x,
            shipY = ship.pos.y;

        ctx.fillStyle = "#0072BB";
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(60, 60);
        ctx.lineTo(60, 40);
        ctx.fill();
    };

    var loop = function() {
        update();
        render();

        requestAnimationFrame(loop);
    };

    loop();

})();