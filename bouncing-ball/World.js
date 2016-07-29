BB.World = function() {

    this.entities = [];

    this.collisions = new BB.Collisions(this.entities);

};

BB.World.prototype = {

    addEntity: function(entity) {
        this.entities.push(entity);
    },

    step: function(dt) {
        this.collisions.step();

        this.entities
            .forEach(function(e) {

            if (e.isRestingOnGround) {
                e.acceleration = 0;
                e.velocity = 0;
            } else {
                e.acceleration = -9.8;
            }

            e.step(dt);
            });
    },

    render: function() {
        var ctx = simulation.ctx;
        var width = simulation.canvas.width;
        var height = simulation.canvas.height;

        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, width, height);

        this.entities.forEach(function(e) {
            e.render();
        });
    }

}