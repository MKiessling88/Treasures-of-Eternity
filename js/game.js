let canvas;
let world;
let keyboard = new Keyboard();
let level = level1;

let loadedImages = 0;

/**
 * Hides the startscreen and shows the canvas, then calls the init function
 * to set up the game.
 */
function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

/**
 * Initializes the game by getting the canvas element from the DOM, creating a new
 * World instance with the given canvas, keyboard and level, and calling the setWorld
 * method of the World instance.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level);
    world.setWorld();
}

/**
 * Reloads the page, i.e. goes back to the startscreen.
 */
function goToStart() {
    window.location.replace('index.html');
}

/**
 * Requests the browser to enter fullscreen mode for the entire document.
 * Supports various vendor-prefixed methods for compatibility with different browsers.
 */

function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari und Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32)
        keyboard.SPACE = true;
    if (e.keyCode == 37)
        keyboard.LEFT = true
    if (e.keyCode == 38)
        keyboard.UP = true;
    if (e.keyCode == 39)
        keyboard.RIGHT = true;
    if (e.keyCode == 40)
        keyboard.DOWN = true;
    if (e.keyCode == 88)
        keyboard.X = true;
    //console.log(e.keyCode);
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 32)
        keyboard.SPACE = false;
    if (e.keyCode == 37)
        keyboard.LEFT = false;
    if (e.keyCode == 38)
        keyboard.UP = false;
    if (e.keyCode == 39)
        keyboard.RIGHT = false;
    if (e.keyCode == 40)
        keyboard.DOWN = false;
    if (e.keyCode == 88)
        keyboard.X = false;
});

document.addEventListener('DOMContentLoaded', () => {
    const btnJump = document.getElementById('btnJump');
    const btnAttack = document.getElementById('btnAttack');
    const btnMoveLeft = document.getElementById('btnMoveLeft');
    const btnMoveRight = document.getElementById('btnMoveRight');
    if (btnJump) {
        btnJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        });

        btnJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
        btnAttack.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.X = true;
        });
        btnAttack.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.X = false;
        });
        btnMoveLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });
        btnMoveLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
        btnMoveRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });
        btnMoveRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
    } else {
        console.error("Element mit ID 'btnJump' nicht gefunden!");
    }
});
