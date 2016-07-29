BB.Vec2 = function(x, y) {

    this.x = x;
    this.y = y;
    
};

BB.Vec2.prototype = {

    add: function(x, y) {
        this.x += x;
        this.y += y;
    }

}