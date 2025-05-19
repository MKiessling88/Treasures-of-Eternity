class Projectil extends MoveableObjekt {
    Images = [
        'img/charakter/fire/fire1.png',
        'img/charakter/fire/fire2.png',
        'img/charakter/fire/fire3.png',
        'img/charakter/fire/fire4.png',
        'img/charakter/fire/fire5.png',
        'img/charakter/fire/fire6.png',
        'img/charakter/fire/fire7.png',
        'img/charakter/fire/fire8.png',
        'img/charakter/fire/fire9.png',
    ];
    Y = 100;
    X = 100;
    width = 50;
    height = 50;
    offset_X = 15;
    offset_Y = 30;
    offset_Width = 35;
    offset_Height = 15;
    startX = this.X;
    colliding = false;
    world;
    moveInterval;

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
        this.remove();
    }

    /**
     * Moves the projectil every 16.7ms.
     * If the projectil collides with an enemy, the enemy's hit() method is called and the projectil explodes.
     * If the projectil is not colliding with an enemy, it moves 6 pixels to the left or right depending on its direction.
     * If the projectil is more than 740 pixels away from its starting position, it is removed from the game world.
     */
    move() {
        this.startX = this.X;
        this.moveInterval = setInterval(() => {
            if (this.colliding) {
                clearInterval(this.moveInterval);
                return;
            }
            if (this.otherDirection) {
                this.X -= 6;
            } else {
                this.X += 6;
            }
            this.world.level.enemys.forEach(enemy => {
                if (this.isCollidingWith(enemy) && !enemy.isDead()) {
                    this.doProjectileHit(enemy);
                }
            });
            const distance = Math.abs(this.X - this.startX);
            if (distance > 200) {
                this.remove();
                clearInterval(this.moveInterval);
            }
        }, 1000 / 60);
    }

    /**
     * Handles the hit event when the projectil collides with an enemy.
     * Sets this.colliding to true, calls the enemy's hit() method, explodes the projectil, plays the explode sound and removes the projectil's move interval.
     * @param {Enemy} enemy - The enemy that was hit.
     */
    doProjectileHit(enemy) {
        this.colliding = true;
        enemy.hit();
        this.explode();
        this.playSound(this.world.sounds.explode);
        clearInterval(this.moveInterval);
        return;
    }

    /**
     * Removes the projectile from the world's projectils array.
     * Checks if the projectile is present in the array and removes it.
     */
    remove() {
        const index = this.world.projectils.indexOf(this);
        if (index > -1) {
            this.world.projectils.splice(index, 1);
        }
    }

    /**
     * Animates the projectile's explosion and removes it after the animation is done.
     * The animation is started by calling animateImagesOnce() with the array of explosion images.
     * After the animation is done, the projectile is removed from the game world by calling remove() after a delay of 600ms (6 images × 100ms).
     */
    explode() {
        this.animateImagesOnce(this.Images);
        setTimeout(() => {
            this.remove();
        }, this.Images.length * 100);
    }
}