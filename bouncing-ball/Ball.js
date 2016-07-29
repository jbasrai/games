BB.Ball = function(x, y, radius, bounciness) {

    this.position = new BB.Vec2(x, y);

    this.velocity = new BB.Vec2(1, 0);

    this.acceleration = new BB.Vec2(0, 0);

    this.radius = radius;

    this.bounciness = bounciness;

};

BB.Ball.prototype = {

    step: function(dt) {
        var p = this.position,
            v = this.velocity,
            a = this.acceleration,
            radius = this.radius,
            isBouncing = this.isBouncing(),
            isRolling = this.isRolling(),
            gravity = simulation.world.gravity,
            friction = simulation.world.friction,
            iAcceleration = this.iAcceleration,
            iiAcceleration = this.iiAcceleration;

        if (isBouncing) {
            a.y = -gravity;
        } else {
            p.y = radius;
            v.y = 0;
            a.y = 0;
        }

        if (isRolling) {
            a.x = -1 * v.x / v.x * friction;
        } else if (!isBouncing) {
            v.x = 0;
            a.x = 0;
        }

        p.add(
            iiAcceleration(a.x, v.x, dt),
            iiAcceleration(a.y, v.y, dt)
        );

        v.add(
            iAcceleration(a.x, dt),
            iAcceleration(a.y, dt)
        );
    },

    isBouncing: function() {
        var p = this.position,
            v = this.velocity,
            radius = this.radius;

        return Math.abs(v.y) > 0.05 ||
            Math.abs(p.y - radius) > 0.01;
    },

    isRolling: function() {
        var v = this.velocity,
            isBouncing = this.isBouncing();

        return !isBouncing && Math.abs(v.x > 0.05);
    },

    hitFloor: function() {
        var p = this.position,
            v = this.velocity,
            radius = this.radius,
            bounciness = this.bounciness;

        v.y = -1 * v.y * bounciness;
    },

    hitWall: function() {
        var p = this.position,
            v = this.velocity,
            radius = this.radius,
            bounciness = this.bounciness;

        v.x = -1 * v.x * bounciness;
    },

    iAcceleration: function(a, dt) {
        return a * dt;
    },

    iiAcceleration: function(a, v, dt) {
        return ( a * dt * dt / 2 ) + ( v * dt );
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