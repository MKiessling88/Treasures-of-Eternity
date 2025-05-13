class MoveableObjekt {
    X;
    Y;
    width;
    height;
    Image;
    imageCache = [];
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 0.3;


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

    applyGravity() {
        setInterval(() => {
            const groundLevel = this.world.canvas.height - (this.height + 60);

            // Wenn Spieler nicht am Boden ist
            if (!this.isOnGround() || this.speedY < 0) {
                this.Y += this.speedY;
                this.speedY += this.acceleration;
            } else {
                    // Spieler ist am Boden
                    this.Y = groundLevel;
                    this.speedY = 0;
            }
        }, 1000 / 60); // 60 FPS!
    }

    isOnGround() {
        return this.Y >= this.world.canvas.height - (this.height + 60);
    }
};