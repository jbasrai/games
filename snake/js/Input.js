SNAKE.Input = function() {

    var keysDown = {};

    window.addEventListener('keydown', function(e) {
        keysDown[e.key] = true;

        e.preventDefault();
    });

    window.addEventListener('keyup', function(e) {
        keysDown[e.key] = false;

        e.preventDefault();
    });

    return keysDown;

};