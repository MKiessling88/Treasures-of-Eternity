class MoveableObjekt {
    X;
    Y;
    width;
    height;
    Image;


    loadImage(path) {
        this.Image = new Image();
        this.Image.src = path;
    }

    moveLeft() {
        this.X -= 10;
    }

    moveRight() {

    }
};