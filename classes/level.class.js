class Level {
    enemys;
    clouds;
    backgroundObjects;
    tilesets;
    collectables;
    levelLength;

    constructor(enemys, clouds, backgroundObjects, tilesets, collectables, levelLength) {
        this.enemys = enemys;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.tilesets = tilesets;
        this.collectables = collectables;
        this.levelLength = levelLength;
    }
}