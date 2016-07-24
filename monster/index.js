console.clear()

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.height = 32 * 15
canvas.width = 32 * 16
canvas.style.border = '1px solid black';
document.body.appendChild(canvas)

let bgReady = false
let heroReady = false
let monsterReady = false

const bgImage = new Image()
const heroImage = new Image()
const monsterImage = new Image()

bgImage.onload = () => { bgReady = true }
heroImage.onload = () => { heroReady = true }
monsterImage.onload = () => { monsterReady = true }

bgImage.src = '/background.png'
heroImage.src = '/hero.png'
monsterImage.src = '/monster.png'

const keysDown = {}
let score = 0

addEventListener('keydown', e => {
    keysDown[e.key] = true
})

addEventListener('keyup', e => {
    keysDown[e.key] = false
})

const hero = {
    speed: 200,
    x: 0,
    y:0
}

const monster = {
    x: 0,
    y: 0
}

const reset = () => {
    hero.x = canvas.width / 2
    hero.y = canvas.height / 2

    monster.x = 32 + Math.random() * (canvas.width - 64)
    monster.y = 32 + Math.random() * (canvas.height - 64)
}

const update = (dt) => {
    const {
        ArrowLeft,
        ArrowRight,
        ArrowUp,
        ArrowDown
    } = keysDown

    if (ArrowUp) {
        hero.y -= hero.speed * dt
    }
    if (ArrowDown) {
        hero.y += hero.speed * dt
    }
    if (ArrowLeft) {
        hero.x -= hero.speed * dt
    }
    if (ArrowRight) {
        hero.x += hero.speed * dt
    }

    const isTouching = () => {
        return hero.x > monster.x - 32 &&
            hero.x < monster.x + 32 &&
            hero.y > monster.y - 32 &&
            hero.y < monster.y + 32
    }

    if (isTouching()) {
        score++
        reset()
    }
}

const render = () => {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0)
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y)
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }

    ctx.fillStyle = 'rgb(250, 250, 250)'
    ctx.font = '24px Helvetica'
    ctx.fillText('score: ' + score, 32, 32)
}

const time = () => Date.now()

const loop = (before=time()) => {
    const now = time()
    const dt = (now - before) * 0.001
    const nextLoop = loop.bind(null, time())

    update(dt)
    render()

    requestAnimationFrame(nextLoop)
}

reset()
loop()