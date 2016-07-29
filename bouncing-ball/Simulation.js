BB.Simulation = function() {

    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 400;
    this.canvas.style.border = '1px solid black';

    this.ctx = this.canvas.getContext('2d');

    this.coords = new BB.Coords(this.canvas.width, this.canvas.height, 2);

    document.body.appendChild(this.canvas);

};

BB.Simulation.prototype = {

    loop: function(before) {
        var now = Date.now();
        var dt = (now - before) / 1000;

        this.step(dt);
        this.render();

        var nextLoop = this.loop.bind(this, Date.now());
        requestAnimationFrame(nextLoop);
    },

    step: function(dt) {
        this.world.step(dt);
    },

    render: function(dt) {
        this.world.render();
    },

    start: function() {
        this.world = new BB.World();
        this.world.addEntity(new BB.Ball(1, 1.5, .1, 0.8));

        this.loop(Date.now());
    }

};