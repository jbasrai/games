BB.Coords = function(canvasWidth, canvasHeight, worldWidth) {

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scale = canvasWidth / worldWidth;

    this.worldWidth = worldWidth;
    this.worldHeight = canvasHeight / this.scale;

};

BB.Coords.prototype = {

    toCanvas: function(x, y, radius) {
        var coords = {
            x: x * this.scale,
            y: -1 * (y * this.scale - this.canvasHeight),
            radius: radius * this.scale
        };

        return coords;
    },

    toWorld: function(x, y) {
        var coords = {
            x: x / this.scale,
            y: (-y + this.canvasHeight) / this.scale
        };

        return coords;
    }

}