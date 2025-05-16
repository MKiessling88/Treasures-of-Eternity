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
    life = 100;
    mana = 100;
    isHurt = false;
    isAttacking = false;


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

    animateImagesOnce(images) {
        let frame = 0; // Lokale Zählvariable

        const interval = setInterval(() => {
            if (frame >= images.length) {
                clearInterval(interval); // Stoppt sauber nach dem letzten Bild
                return;
            }

            const path = images[frame];
            this.Image = this.imageCache[path];
            frame++;
        }, 1000 / 10); // z. B. 15 FPS
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

    isCollidingWith(mo) {
        const leftA = this.X + (this.offset_X ?? 0);
        const rightA = leftA + (this.offset_Width ?? this.width);
        const topA = this.Y + (this.offset_Y ?? 0);
        const bottomA = topA + (this.offset_Height ?? this.height);

        const leftB = mo.X + (mo.offset_X ?? 0);
        const rightB = leftB + (mo.offset_Width ?? mo.width);
        const topB = mo.Y + (mo.offset_Y ?? 0);
        const bottomB = topB + (mo.offset_Height ?? mo.height);

        return (
            rightA > leftB &&
            leftA < rightB &&
            bottomA > topB &&
            topA < bottomB
        );
    }

    isOnGround() {
        return this.Y >= this.world.canvas.height - (this.height + 60);
    }

    hit() {
        if (this.life > 0 && !this.isHurt) {
            this.life -= 10;
            this.isHurt = true;

            if (this.isDead()) {
                this.animateImagesOnce(this.Images_DEAD);
                if (this instanceof Goblin || this instanceof Endboss) {
                    this.remove();
                }
            } else if (this.isHurt) {
                this.animateImagesOnce(this.Images_HURT);
            }

            // Nach 1 Sekunde darf wieder Schaden genommen werden
            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        }
    }

    isDead() {
        return this.life <= 0;
    }

    remove() {
        setTimeout(() => {
            if (this.life <= 0) {
                const index = this.world.level.enemys.indexOf(this);
                if (index > -1) {
                    this.world.level.enemys.splice(index, 1);
                }
            }
        }, 2000);
    }

    drawFrame(ctx, obj) {
        if (this instanceof Charakter || this instanceof Goblin || this instanceof Endboss || this instanceof Projectil || this instanceof CollectableHEART || this instanceof CollectablePotion) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                obj.X + (obj.offset_X ?? 0),
                obj.Y + (obj.offset_Y ?? 0),
                obj.offset_Width ?? obj.width,
                obj.offset_Height ?? obj.height
            );
        }

    }
};