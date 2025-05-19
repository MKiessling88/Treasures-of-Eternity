class EnemyProjectile extends MoveableObjekt {
    Images = [
        'img/dino/fire/fire1.png',
        'img/dino/fire/fire2.png',
        'img/dino/fire/fire3.png',
        'img/dino/fire/fire4.png',
        'img/dino/fire/fire5.png',
        'img/dino/fire/fire6.png',
        'img/dino/fire/fire7.png',
        'img/dino/fire/fire8.png',
        'img/dino/fire/fire9.png',
        'img/dino/fire/fire10.png',
    ];
    Y = 100;
    X = 100;
    width = 160;
    height = 100;
    offset_X = -10;
    offset_Y = 43;
    offset_Width = 35;
    offset_Height = 15;
    startX = this.X;
    colliding = false;
    world;

    constructor(x, y, otherDirection, world) {
        super();
        this.loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.X = x;
        this.Y = y;
        this.startX = this.X;
        this.otherDirection = otherDirection;
        this.world = world;

        this.move();
    }

    /**
     * Moves the enemy projectile every 16.7ms.
     * If the projectile is colliding with the player, the projectile's doProjectileHit() method is called and the projectile is removed.
     * If the projectile is not colliding with the player, it moves 3 pixels to the left or right depending on its direction.
     * If the projectile is more than 500 pixels away from its starting position, it is removed from the game world.
     */
    move() {
        this.startX = this.X;
        const moveInterval = setInterval(() => {
            if (this.colliding) {
                clearInterval(moveInterval);
                return;
            }
            if (this.otherDirection) {
                this.X -= 3;
            } else {
                this.X += 3;
            }
            if (this.isCollidingWith(this.world.charakter)) {
                this.doProjectileHit();
            }
            const distance = Math.abs(this.X - this.startX);
            if (distance > 500) {
                this.remove();
                clearInterval(moveInterval);
            }
        }, 1000 / 60);
    }

/**
 * Handles the hit event when the enemy projectile collides with the character.
 */
    doProjectileHit() {
        this.colliding = true;
        this.world.charakter.hit(25);
        this.explode();
        this.playSound(this.world.sounds.explode);
        clearInterval(moveInterval);
        return;
    }

/**
 * Removes the enemy projectile from the world's projectiles array.
 * Checks if the projectile is present in the array and removes it.
 */
    remove() {
        const index = this.world.projectils.indexOf(this);
        if (index > -1) {
            this.world.projectils.splice(index, 1);
        }
    }

/**
 * Triggers the explosion animation for the projectile by cycling through its images once.
 * After the animation is complete, removes the projectile from the game world.
 * The animation duration is determined by the number of images and a 100ms per image delay.
 */
    explode() {
        this.animateImagesOnce(this.Images);
        setTimeout(() => {
            this.remove();
        }, this.Images.length * 100);
    }
}