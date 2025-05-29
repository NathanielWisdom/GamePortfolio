import { movePlayer, updatePlayerPosition } from "./player.js"
import { checkCollision } from "./collisionDetection.js"
import { Wall, Project } from "./gameObjects.js"

const playerDiv = document.getElementById('player')
const keymap = {} //keymap of movement keys

let playerX = 50
let playerY = 50
updatePlayerPosition(playerX, playerY)

const playerWidth = playerDiv.offsetWidth;
const playerHeight = playerDiv.offsetHeight;

// Helper to get player rectangle
function getPlayerRect(x, y) {
    return {
        left: x,
        top: y,
        right: x + playerWidth,
        bottom: y + playerHeight
    };
}

// Game Object Instantiation
const wall1 = new Wall('wall1', 400, 400, 30, 200);
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

// Player Movement Key Detection Logic
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

// Game Loop (Happening every frame)
function gameLoop(){
    const maxX = window.innerWidth - playerWidth;
    const maxY = window.innerHeight - playerHeight;

    const [dx, dy] = movePlayer(keymap)
    
    // Calculate new position
    let newX = playerX + dx;
    let newY = playerY + dy;
    
    // Create temp rectangle for collision detection
    const playerRect = getPlayerRect(newX, newY);

    // Check collisions with all objects
    for (const obj of gameObjects) {
        if (!obj.element) continue;
        
        // Get object rectangle
        const objRect = {
            left: obj.x,
            top: obj.y,
            right: obj.x + obj.width,
            bottom: obj.y + obj.height
        };
        
        if (checkCollision(playerRect, objRect)) {
            if (obj instanceof Wall) {
                // Calculate penetration depth
                const xOverlap = Math.min(
                    playerRect.right - objRect.left,
                    objRect.right - playerRect.left
                );
                
                const yOverlap = Math.min(
                    playerRect.bottom - objRect.top,
                    objRect.bottom - playerRect.top
                );
                
                // Resolve based on smallest overlap
                if (xOverlap < yOverlap) {
                    // Horizontal collision
                    if (playerRect.left < objRect.left) {
                        newX = objRect.left - playerWidth;
                    } else {
                        newX = objRect.right;
                    }
                } else {
                    // Vertical collision
                    if (playerRect.top < objRect.top) {
                        newY = objRect.top - playerHeight;
                    } else {
                        newY = objRect.bottom;
                    }
                }
            } 
            else if (obj instanceof Project) {
                console.log(`Player touched project: ${obj.title}`);
            }
        }
    }

    // Apply screen boundaries
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    // Update player position
    playerX = newX;
    playerY = newY;
    updatePlayerPosition(playerX, playerY);
    
    requestAnimationFrame(gameLoop)
}

gameLoop()