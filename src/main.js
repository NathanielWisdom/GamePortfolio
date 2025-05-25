import { movePlayer } from "./player.js"

const keymap = {}

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyPressed)){
        event.preventDefault()
    }
    
    keymap[keyPressed] = true

})

document.addEventListener('keyup', (event) => {
    const keyReleased = event.key
    keymap[keyReleased] = false
})

function gameLoop(){
    movePlayer(keymap)
    requestAnimationFrame(gameLoop)
}

gameLoop()
