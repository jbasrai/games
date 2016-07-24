const canvas = document.getElementById('canvas')
canvas.height = 300
canvas.width = 400
canvas.style.border = '1px solid black'
const ctx = canvas.getContext('2d')

let gameState
let nextState

const keysDown = {}

const snake = {
    squares: []
}

const apple = {}
const spawnApple = () => {
    apple.x = Math.floor(Math.random() * (canvas.width - 10) / 10) * 10
    apple.y = Math.floor(Math.random() * (canvas.height - 10) / 10) * 10
}

const score = () => snake.squares.length

addEventListener('keydown', e => {
    keysDown[e.key] = true
})

addEventListener('keyup', e => {
    keysDown[e.key] = false
})

const reset = () => {
    snake.squares = [ [10, 0], [0, 0] ]
    snake.direction = 'RIGHT'
    snake.speed = 10
    spawnApple()
}

const gamePlay = {
    lastUpdate: 0,
    update: function(dt) {
        const {
            ArrowUp,
            ArrowDown,
            ArrowLeft,
            ArrowRight
        } = keysDown

        if (ArrowUp) {
            snake.direction = 'UP'
        }

        if (ArrowDown) {
            snake.direction = 'DOWN'
        }

        if (ArrowLeft) {
            snake.direction = 'LEFT'
        }

        if (ArrowRight) {
            snake.direction = 'RIGHT'
        }

        this.lastUpdate += dt
        if (this.lastUpdate < 1 / snake.speed) {
            return;
            this.lastUpdate += dt
        }
        this.lastUpdate = 0

        const head = snake.squares[0]
        let nextPos = []
        switch (snake.direction) {
            case 'UP':
                nextPos = [ head[0], head[1] - 10 ]
                break
            case 'DOWN':
                nextPos = [ head[0], head[1] + 10 ]
                break
            case 'LEFT':
                nextPos = [ head[0] - 10, head[1] ]
                break
            case 'RIGHT':
                nextPos = [ head[0] + 10, head[1] ]
                break
        }

        const isCollided = () => {
            return nextPos[0] < 0 ||
                nextPos[0] >= canvas.width ||
                nextPos[1] < 0 ||
                nextPos[1] >= canvas.height ||
                snake.squares.slice(0, -1).findIndex(s => nextPos[0] === s[0] && nextPos[1] === s[1]) > -1
        }

        const isApple = () => {
            return nextPos[0] === apple.x &&
                nextPos[1] === apple.y
        }

        if (isCollided()) {
            nextState = gameOver
        }

        if (isApple()) {
            snake.squares.unshift([ apple.x, apple.y ])
            spawnApple()
        } else {
            snake.squares.pop()
            snake.squares.unshift(nextPos)
        }
    },
    render: function() {
        ctx.fillStyle = 'grey'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = '160px Helvetica'
        ctx.fillText(score(), 150, 200)

        ctx.fillStyle = 'green'
        snake.squares.forEach(s => {
            ctx.fillRect(s[0], s[1], 10, 10)
        })

        ctx.fillStyle = 'red'
        ctx.fillRect(apple.x, apple.y, 10, 10)
    }
}

const gameOver = {
    update: function(dt) {
        const Spacebar = keysDown[' ']
        if (Spacebar) {
            reset()
            nextState = gamePlay
        }
    },
    render: function() {
        ctx.fillStyle = 'grey'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = '160px Helvetica'
        ctx.fillText(score(), 150, 200)

        ctx.font = '32px Helvetica'
        ctx.fillText('Game over', 20, 40)
    }
}

const time = () => Date.now()

gameState = gameOver
const loop = (before=time()) => {
    const now = time()
    const dt = (now - before) * 0.001

    gameState.update(dt)
    gameState.render()
    if (nextState) {
        gameState = nextState
        nextState = null
    }

    const nextLoop = loop.bind(null, time())
    requestAnimationFrame(nextLoop)
}

loop()