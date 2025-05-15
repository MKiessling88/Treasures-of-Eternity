class Interface extends MoveableObjekt {
    Y = 10;
    X = 10;
    height = 50;
    width = 50;

    constructor(path, x, y, width, height) {
        super();
        this.loadImage(path);
        this.X = x;
        this.Y = y;
        this.width = width;
        this.height = height;
    }
}