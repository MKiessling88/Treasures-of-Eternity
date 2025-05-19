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


    /**
     * Loads an image from the given path and assigns it to the Image field
     * of this object. This method is used to load the default image of the
     * object, and is also used by the animateImages methods to load the
     * images for the animations.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.Image = new Image();
        this.Image.src = path;
    }

    /**
     * Loads an array of images from the given paths and assigns them to the
     * imageCache field of this object. The images are indexed by their path.
     * This method is used by the animateImages methods to load the images for
     * the animations.
     * @param {string[]} array - The array of paths to the image files.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Moves the object 10 pixels to the left.
     */
    moveLeft() {
        this.X -= 10;
    }

    /**
     * Moves the object 10 pixels to the right.
     */
    moveRight() {
        this.X += 10;
    }

    /**
* Moves the goblin to the left by subtracting 0.25 from its X position every 16.7ms.
* If the goblin is hurt or dead, the movement is paused.
*/
    move() {
        setInterval(() => {
            if (!this.isHurt && !this.isDead()) {
                if (this.otherDirection) {
                    this.X -= 0.25;
                    if (this.X <= -400) {
                        this.otherDirection = false;
                    }
                } else {
                    this.X += 0.25;
                    if (this.X >= 2000) {
                        this.otherDirection = true;
                    }
                }
            }
        }, 1000 / 60);
    }

    /**
* Animates the goblin by switching between the walk images every 200ms.
* If the goblin is hurt or dead, the animation is paused.
*/
    animate() {
        setInterval(() => {
            if (!this.isHurt && !this.isDead()) {
                this.animateImages(this.Images_WALK);
            }
        }, 1000 / 5);
    }

    /**
     * Animates the object by switching between the images in the given array.
     * The method is called every 100ms to update the animation.
     * @param {string[]} images - The array of paths to the image files.
     */
    animateImages(images) {
        let path = images[this.currentImage];
        this.Image = this.imageCache[path];
        this.currentImage = (this.currentImage + 1) % images.length;
    }

    /**
     * Animates the object by switching between the images in the given array once.
     * The method is called every 100ms to update the animation, and stops after
     * the last image in the array has been shown.
     * @param {string[]} images - The array of paths to the image files.
     */
    animateImagesOnce(images) {
        let frame = 0;
        const interval = setInterval(() => {
            if (frame >= images.length) {
                clearInterval(interval);
                return;
            }
            const path = images[frame];
            this.Image = this.imageCache[path];
            frame++;
        }, images.length * 10);
    }

    /**
     * Applies gravity to the object by updating its vertical speed and
     * position in an interval.
     */
    applyGravity() {
        this.world.intervals.push(setInterval(() => {
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
        }, 1000 / 60)); // 60 FPS!
    }

    /**
     * Checks if the object collides with the given MoveableObject mo.
     * Uses the AABB (Axis-Aligned Bounding Box) collision detection algorithm.
     * @param {MoveableObject} mo - The object to check for collision.
     * @returns {boolean} True if the objects collide, false otherwise.
     */
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

    /**
     * Checks if the object is on the ground.
     * @returns {boolean} True if the object is on the ground, false otherwise.
     */
    isOnGround() {
        return this.Y >= this.world.canvas.height - (this.height + 60);
    }

    /**
     * Reduces the life of the object by 10 and sets it into the "hurt" state.
     * If the object is dead after the hit, it will animate its death animation
     * and remove itself from the game world.
     * If the object is not dead, it will animate its hurt animation and
     * reset the hurt state after 1 second.
     */
    hit(dmg) {
        if (this.life > 0 && !this.isHurt) {
            this.life -= dmg || 10;
            this.isHurt = true;
            if (this.isDead()) {
                this.animateImagesOnce(this.Images_DEAD);
                if (this instanceof Goblin || this instanceof Endboss || this instanceof Dino) {
                    this.remove();
                }
            } else if (this.isHurt) {
                this.animateImagesOnce(this.Images_HURT);
            }
            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        }
    }

    /**
     * Synchronizes the resource bars in the game interface with the current
     * 'mana' and 'life' values of the object. Updates the width of the mana
     * and life bars in the interface to reflect the object's current resource
     * levels.
     */
    resourceBarSync() {
        this.world.interface[5].width = this.mana;
        this.world.interface[4].width = this.life;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.life <= 0;
    }

    /**
     * Removes the object from the game world after a delay of 2 seconds if the object is dead.
     * The object is removed from the enemys array of the level.
     */
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

    playSound(Sound) {
        // Damit der Sound bei schnellem Drücken mehrfach funktioniert:
        Sound.currentTime = 0;
        Sound.play().catch(err => {
            console.warn("Audio konnte nicht abgespielt werden:", err);
        });
    }


    /**
     * Draws a red outline around the given object if it is an instance of specified classes.
     * The outline is drawn on the provided canvas context using the object's dimensions,
     * taking into account any offset values. This visual aid can be used for debugging
     * purposes to highlight the object's bounding box on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the outline.
     * @param {Object} obj - The object to outline, expected to have position and dimension properties.
     */
    drawFrame(ctx, obj) {
        if (this instanceof Charakter || this instanceof Goblin || this instanceof Endboss || this instanceof Projectil || this instanceof Dino || this instanceof EnemyProjectile) {
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