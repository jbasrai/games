BB.World = function() {

    this.entities = [];

    this.collisions = new BB.Collisions(this.entities);

    this.gravity = 9.8;

    this.friction = 0.5;

};

BB.World.prototype = {

    addEntity: function(entity) {
        this.entities.push(entity);
    },

    step: function(dt) {
        this.collisions.step();

        this.entities.forEach(function(e) {
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