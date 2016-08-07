(function() {

    /* set up canvas */
    var canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = "1px solid black";

    var ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);

    canvas.addEventListener("click", function(e) {
        var dx = canvas.offsetLeft,
            dy = canvas.offsetTop,
            x = e.clientX,
            y = e.clientY;

        clicked.push({
            x: x - dx,
            y: y - dy
        });
    });


    /* game state */
    var clicked = [];
        balls = [],
        radius = 5;

    var generateBall = function() {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;

        balls.push({
            x: x,
            y: y
        });
    };

    for (var i = 0; i < 5; i ++) {
        generateBall();
    }


    /* game loop */
    var update = function() {
        if (clicked.length === 0) return;

        var coords = clicked.pop(),
            clickX = coords.x,
            clickY = coords.y;

        balls = balls.filter(function(b) {
            var ballX = b.x,
                ballY = b.y;

            return Math.pow(clickX - ballX, 2) + Math.pow(clickY - ballY, 2) > Math.pow(radius, 2);
        });

        for (var i = 0; i < 5 - balls.length; i ++) {
            generateBall();
        }
    };

    var render = function() {
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        balls.forEach(function(b) {
            var x = b.x,
                y = b.y;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    var loop = function() {
        update();
        render();

        requestAnimationFrame(loop);
    };

    loop();

})();