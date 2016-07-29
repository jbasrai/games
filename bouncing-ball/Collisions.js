BB.Collisions = function(entities) {

    this.entities = entities;

};

BB.Collisions.prototype = {

    step: function(dt) {
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];

            if (e.velocity.y < 0 && e.position.y - e.radius <= 0) {
                e.velocity.y = -1 * e.velocity.y * e.bounciness;
            }
        }
    }

};