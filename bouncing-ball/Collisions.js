BB.Collisions = function(entities) {

    this.entities = entities;

};

BB.Collisions.prototype = {

    step: function(dt) {
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i],
                p = e.position,
                v = e.velocity,
                radius = e.radius
                width = simulation.coords.worldWidth;

            /* bottom wall */
            if (v.y < 0 && p.y - radius <= 0) {
                e.hitFloor();
            }

            /* side walls */
            if (v.x < 0 && p.x - radius <= 0 ||
                v.x > 0 && p.x + radius >= width) {

                e.hitWall();
            }
        }
    }

};