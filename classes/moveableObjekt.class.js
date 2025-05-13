class MoveableObjekt{
    X;
    Y;
    width;
    height;
    Image;
    imageCache = [];
    otherDirection = false;
    currentImage = 0;


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

    animateImages(images) {
        let path = images[this.currentImage];
        this.Image = this.imageCache[path];
        this.currentImage = (this.currentImage + 1) % images.length;
    }
};