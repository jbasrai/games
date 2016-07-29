BB.Collisions = function(entities) {

    this.entities = entities;

};

BB.Collisions.prototype = {

    step: function(dt) {
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];

            if (Math.abs(e.velocity) < 0.05 && Math.abs(e.position.y - e.radius) < 0.01 ) {
                e.isRestingOnGround = true;
                e.position.y = e.radius;
            } else if (e.velocity < 0 && e.position.y - e.radius <= 0) {
                e.velocity = -1 * e.velocity * e.bounciness;
            }
        }
    }

};