import { movePlayer } from "./player.js"
import { checkCollision } from "./collisionDetection.js"
import { Wall, Project } from "./gameObjects.js"

const playerDiv = document.getElementById('player')
// const projectDiv = document.getElementById('project')

const keymap = {}

const wall1 = new Wall('wall1', 400, 600, 30, 200);

const project = new Project(
    'project-game', // HTML ID
    500, 200, 80, 80, // x, y, width, height
    {
        title: 'My Game Project',
        description: 'A cool game demo!',
        link: 'https://editor.p5js.org/nathanielwisdom/full/bSg0ro_BV',
        modalContent: '<h2>Dunns River Fails</h2><p>Details about the game.</p>'
    }
);

const gameObjects = [wall1, project];

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
    // const haveCollided = checkCollision(playerDiv, projectDiv)

    // src/main.js (inside gameLoop)


// Loop through all game objects
    gameObjects.forEach(obj => {
        if (obj.element && checkCollision(playerDiv, obj.element)) {
            if (obj instanceof Wall) {
                if (playerDiv.left <= obj.element.right){
                    playerDiv.left = obj.element.right
                    

                } // rect1 is to the right of rect2
                if (playerDiv.right <= obj.element.left){

                } // rect1 is to the left of rect2
                if(playerDiv.top >= obj.element.bottom){

                } // rect1 is below rect2
                if (playerDiv.bottom <= obj.element.top){

                }
                
                console.log(`Player hit a wall!`);
              
            } else if (obj instanceof Project) {
                console.log(`Player touched project: ${obj.title}`);
            }
        }
    });



    // if (haveCollided){
    //     console.log("Success, they collided")
    // }


    requestAnimationFrame(gameLoop)
}

gameLoop()
