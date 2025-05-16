class Tileset extends MoveableObjekt {
    width = 50;
    height = 50;


    constructor(path, x, y) {
        super();
        this.loadImage(path);
        this.X = x;
        this.Y = y;
    }
}