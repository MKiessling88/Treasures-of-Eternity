class Interface extends MoveableObjekt {
    Y = 10;
    X = 10;
    height = 50;
    width = 50;
    manabar = false;
    lifebar = false;

    constructor(path, x, y, width, height, world) {
        super();
        this.loadImage(path);
        this.X = x;
        this.Y = y;
        this.width = width;
        this.height = height;
        this.world = world;
    }

}