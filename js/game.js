let canvas;
let world;
let keyboard = new Keyboard();
let level = level1;

let loadedImages = 0;

function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level);
    world.setWorld();
}

function goToStart() {
    window.location.replace('index.html');
}

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
