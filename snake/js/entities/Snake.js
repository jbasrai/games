SNAKE.Snake = function() {

    this.greenSquare = function(x, y) {
        return new SNAKE.Square(x, y, 'green')
    };

    this.squares = [
        this.greenSquare(1, 0),
        this.greenSquare(0, 0)
    ];

    this.spareSquare = this.greenSquare(null, null);

    this.speed = 10;

    this.direction = 'RIGHT';

    this.attemptedDirection = this.direction;

    this.lastUpdate = 0;

};

SNAKE.Snake.prototype = {

    update: function(dt) {
        /* don't set direction immediately, it may be invalid */
        var direction = this.attemptDirection();

        /* snake moves in discrete steps */
        if(this.shouldMoveSnake(dt)) {
            this.validateDirection();
            this.moveSnake(direction);
        }
    },

    grow: function() {
        this.squares.push(this.tail);
        this.tail = null;
        this.spareSquare = this.greenSquare(null, null);
    },

    attemptDirection: function() {
        var keysDown = game.globalState.keysDown;

        if (keysDown.ArrowLeft) {
            this.attemptedDirection = 'LEFT';
        }

        if (keysDown.ArrowRight) {
            this.attemptedDirection = 'RIGHT';
        }

        if (keysDown.ArrowUp) {
            this.attemptedDirection = 'UP';
        }

        if (keysDown.ArrowDown) {
            this.attemptedDirection = 'DOWN';
        }
    },

    validateDirection: function(attempted) {
        if (this.direction === 'LEFT' && this.attemptedDirection === 'RIGHT' ||
            this.direction === 'RIGHT' && this.attemptedDirection === 'LEFT' ||
            this.direction === 'UP' && this.attemptedDirection === 'DOWN' ||
            this.direction === 'DOWN' && this.attemptedDirection === 'UP') {

            /* invalidate direction and keep direction the same */
            return;
        }

        this.direction = this.attemptedDirection;
    },

    shouldMoveSnake: function(dt) {
        this.lastUpdate += dt;

        if (this.lastUpdate < 1 / this.speed) {
            return false;
        }

        this.lastUpdate = 0;
        return true;
    },

    moveSnake: function() {
        var head = this.squares[0];

        var newHead = this.tail || this.spareSquare;

        this.tail = this.squares.pop();

        switch (this.direction) {
            case 'RIGHT':
                newHead.x = head.x + 1;
                newHead.y = head.y;
                break;
            case 'LEFT':
                newHead.x = head.x - 1;
                newHead.y = head.y;
                break;
            case 'UP':
                newHead.x = head.x;
                newHead.y = head.y - 1;
                break;
            case 'DOWN':
                newHead.x = head.x;
                newHead.y = head.y + 1;
                break;
        }

        this.squares.unshift(newHead);
    },

    render: function() {
        this.squares.forEach(function(s) {
            s.render();
        });
    }

};