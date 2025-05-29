const player = document.getElementById("player")

// let playerX = 50
// let playerY = 50

const playerSpeed = 2
export const updatePlayerPosition = (playerX, playerY) => {
    // this replaces the stylesheet position of the player div values with js values
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}

export const movePlayer = (keymap) => {
    let maxX = window.innerWidth - player.offsetWidth
    let maxY = window.innerHeight - player.offsetHeight

    let dx = 0
    let dy = 0

   if (keymap['ArrowUp']){
        dy -= playerSpeed
   }

   if (keymap['ArrowDown']){
        dy += playerSpeed
   }

   if (keymap['ArrowLeft']){
        dx -= playerSpeed
   }

   if (keymap['ArrowRight']){
        dx += playerSpeed
   }    
    // playerX += dx
    // playerY += dy

//     playerX = Math.max(0, Math.min(playerX, maxX));
//     playerY = Math.max(0, Math.min(playerY, maxY));

//     updatePlayerPosition()
   return [dx, dy]

}

