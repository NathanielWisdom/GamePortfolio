const playerSettings = {
    playerSpeed: 5

}


export function movePlayer(keymap){
    let dx = 0;
    let dy = 0;

    if (keymap['ArrowUp'] || keymap['w'] || keymap['W']){
        dy -= playerSettings.playerSpeed
    }

    if (keymap['ArrowDown'] || keymap['s'] || keymap['S']){
        dy += playerSettings.playerSpeed
    }

    if (keymap['ArrowLeft'] || keymap['a'] || keymap['A']){
        dx -= playerSettings.playerSpeed
    }

    if (keymap['ArrowRight'] || keymap['d'] || keymap['D'] ){
        dx += playerSettings.playerSpeed
    }
    

    return [dx, dy]

}