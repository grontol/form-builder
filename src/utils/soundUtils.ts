const sound = new Audio("sounds/beep.wav");
sound.volume = 0.5

function playBeep() {
    if (!sound.paused) {
        sound.pause()
        sound.currentTime = 0
    }

    sound.play()
}

export {
    playBeep
}