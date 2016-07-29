BB.Ball = function(x, y, radius, bounciness) {

    this.position = new BB.Vec2(x, y);

    // this.velocity = new BB.Vec2(0, 0);

    // this.acceleration = new BB.vec2(0, 0);

    this.velocity = 0;

    this.acceleration = 0;

    this.radius = radius;

    this.bounciness = bounciness;

};

BB.Ball.prototype = {

    step: function(dt) {
        var y = this.position.y;
        var v = this.velocity;
        var a = this.acceleration;

        var newY = (a * dt * dt / 2) + (v * dt) + y
        var newV = a * dt + v;

        this.position.y = newY;
        this.velocity = newV;
    },

    render: function() {
        var ctx = simulation.ctx;
        var canvasCoords = simulation.coords.toCanvas(
            this.position.x, 
            this.position.y,
            this.radius
        );
        var x = canvasCoords.x;
        var y = canvasCoords.y;
        var radius = canvasCoords.radius;

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

};