const playerSettings = {
    playerSpeed: 5

}


export function movePlayer(keymap){
    let dx = 0;
    let dy = 0;

    if (keymap['ArrowUp'] || keymap['w']){
        dy -= playerSettings.playerSpeed
    }

    if (keymap['ArrowDown'] || keymap['s']){
        dy += playerSettings.playerSpeed
    }

    if (keymap['ArrowLeft'] || keymap['a']){
        dx -= playerSettings.playerSpeed
    }

    if (keymap['ArrowRight'] || keymap['d']){
        dx += playerSettings.playerSpeed
    }
    

    return [dx, dy]

}