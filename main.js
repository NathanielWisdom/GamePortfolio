import { projects } from "./config.js";
import { movePlayer } from "./gameLogics/player.js";
import { isColliding } from "./gameLogics/collision.js";

console.log('Projects loaded:', projects);

let playerX = window.innerWidth/2;
let playerY = window.innerHeight/2;
const keymap = {};
let gameObjects = [];
let playerDiv;

function initiate(){
    console.log('initiate called')
    projects.forEach(createProject)
    console.log('projects created')
    
    playerDiv = document.getElementById('player')
    console.log('playerDiv:', playerDiv)
    playerDiv.style.backgroundImage = "url('assets/Player/Walk Down.png')";
    playerDiv.style.backgroundSize = '50px 70px'
    console.log('about to add menu listener')
    
    // 1. Explicitly grab the elements from the DOM so Vercel can find them
    const menuButton = document.getElementById('menu-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
    
    // 2. Now the listener will bind properly without throwing a ReferenceError
    menuButton.addEventListener('click', () => {
        // Toggle the open class
        menuDropdown.classList.toggle('open');
    });
}

//
function gameloop(){
    let [dx, dy] = movePlayer(keymap)

    if (Math.abs(dx) > Math.abs(dy)){
        if (dx > 0){
            playerDiv.style.backgroundImage = "url('assets/Player/Walk Right.png')";
        } else if (dx < 0){
            playerDiv.style.backgroundImage = "url('assets/Player/Walk Left.png')";
        }
    } else {
        if (dy > 0){
            playerDiv.style.backgroundImage = "url('assets/Player/Walk Down.png')";
        } else if (dy < 0) {
            playerDiv.style.backgroundImage = "url('assets/Player/Walk Up.png')";
        }

    }

    if(playerX + dx > window.innerWidth || playerX + dx < 0){
        dx = 0
    }

    if(playerY + dy > window.innerHeight || playerY + dy < 0){
        dy = 0
    }

    
    playerX += dx;
    playerY += dy;

    // Check all collisions
    let collidingProject = null;
    projects.forEach(project => {
        if (collidingWithPlayer(project)) {
            collidingProject = project;
        }
    });
    
    document.getElementById('collisionBox')?.remove()

    // Create collision box if any collision detected
    if (collidingProject) {
        const playerObj = playerDiv.getBoundingClientRect();
        const box = document.createElement('div');
        box.id = 'collisionBox';
        box.innerHTML = collidingProject.title + ": " + collidingProject.description;
        box.style.cssText = `position: absolute; left: ${playerObj.left}px; top: ${playerObj.top - 50}px; background: white; color: black; padding: 10px; border: 2px solid black; z-index: 1000; text-wrap: wrap; width: 150px`;
        document.getElementById('background').appendChild(box);
    }

    // Open a project link  
    if(collidingProject && keymap['e']){
            window.open(collidingProject.link, '_blank')
            keymap['e'] = false
    }
    
    // Update playerDiv CSS position
    if (playerDiv) {
        playerDiv.style.left = playerX + 'px';
        playerDiv.style.top = playerY + 'px';
    }
    
    requestAnimationFrame(gameloop);
}



function collidingWithPlayer(gameObject){
    let object = {
        top: gameObject.y * window.innerHeight ,
        left: gameObject.x * window.innerWidth,
        width: gameObject.width,
        height: gameObject.height
    }

    let playerObj = playerDiv.getBoundingClientRect();
    return isColliding(playerObj, object)
}

function createProject(project){
    const div = document.createElement('div');
    div.id = project.id;
    div.style.position = 'absolute';
    div.style.width = `${project.width}px`;
    div.style.height = `${project.height}px`;
    div.style.top = `${project.y * window.innerHeight}px`;
    div.style.left = `${project.x * window.innerWidth}px`;
    div.style.zIndex = '1';
    
    const img = document.createElement('img');
    img.src = project.image;
    img.style.width = '100%';
    img.style.height = '100%';
    
    div.appendChild(img);
    document.getElementById('background').appendChild(div);
} 

function handleKeyPress (event){
    const key = event.key;
    if (key == 'ArrowUp' || key == 'ArrowDown' || key == 'ArrowLeft' || key == 'ArrowRight'){
        event.preventDefault()
    }
    keymap[key] = true
}

function handleKeyRelease (event){
    const key = event.key;
    keymap[key] = false
}

//calling functions
initiate()
gameloop()
document.addEventListener('keydown', handleKeyPress)
document.addEventListener('keyup', handleKeyRelease)

