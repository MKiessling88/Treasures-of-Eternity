class MoveableObjekt{
    X;
    Y;
    width;
    height;
    Image;
    imageCache = [];


    loadImage(path) {
        this.Image = new Image();
        this.Image.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        this.X -= 10;
    }

    moveRight() {
        this.X += 10;
    }
};