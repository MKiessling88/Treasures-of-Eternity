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

        const moveInterval = setInterval(() => {
            if (this.colliding) {
                clearInterval(moveInterval);
                return;
            }

            // Bewegung des Objekts
            if (this.otherDirection) {
                this.X -= 6;
            } else {
                this.X += 6;
            }

            // Überprüfung auf Kollision mit jedem Gegner
            this.world.level.enemys.forEach(enemy => {
                if (this.isCollidingWith(enemy) && !enemy.isDead()) {
                    this.colliding = true;
                    enemy.hit();
                    this.explode();
                    this.playSound(this.world.sounds.explode);
                    clearInterval(moveInterval);
                    return; // wichtig, um nicht mehr weiter zu machen
                }
            });

            // Überprüfung der zurückgelegten Distanz
            const distance = Math.abs(this.X - this.startX);
            if (distance > 200) {
                this.remove();
                clearInterval(moveInterval);
            }
        }, 1000 / 60); // Aktualisierung mit 60 FPS
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
        this.animateImagesOnce(this.Images); // z. B. Explosionsbilder
        setTimeout(() => {
            this.remove();
        }, this.Images.length * 100); // z. B. 6 Bilder × 100ms
    }
}