class BackgrounfObject extends MoveableObjekt {
    height = 480;
    width = 740;
    Y = 0;

    constructor(x, path) {
        super();
        this.loadImage(path);
        this.X = x;
    }
}