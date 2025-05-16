let canvas;
let world;
let keyboard = new Keyboard();
let level = level1;

let loadedImages = 0;

function beginLoading() {
    document.getElementById('startImage').style.display = 'none';
    document.getElementById('loaderContainer').style.display = 'block';
    document.getElementById('loadingText').style.display = 'block';

    preloadAssets(ASSETS, startGame);
}

function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

function preloadAssets(assetPaths, onComplete) {
    const total = assetPaths.length;

    assetPaths.forEach(path => {
        const img = new Image();
        img.src = path;

        img.onload = img.onerror = () => {
            loadedImages++;
            updateLoadingBar(loadedImages, total);

            if (loadedImages === total) {
                setTimeout(onComplete, 300);
            }
        };
    });
}

function updateLoadingBar(loaded, total) {
    const percent = Math.floor((loaded / total) * 100);
    document.getElementById('loaderBar').style.width = percent + '%';
    document.getElementById('loadingText').innerText = `Lädt ${percent}%`;
}



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level);
    world.setWorld();
}

function goToStart() {
    window.location.replace('index.html');
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
