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
        // this.remove();
    }

    move() {
        this.startX = this.X;

        const moveInterval = setInterval(() => {
            if (this.colliding) {
                clearInterval(moveInterval);
                return;
            }

            // Bewegung des Objekts
            if (this.otherDirection) {
                this.X -= 3;
            } else {
                this.X += 3;
            }

            // Überprüfung auf Kollision mit dem Gegner
            if (this.isCollidingWith(this.world.charakter)) {
                this.colliding = true;
                this.world.charakter.hit(25);
                this.explode();
                this.playSound(this.world.sounds.explode);
                clearInterval(moveInterval);
                return;
            }

            // Überprüfung der zurückgelegten Distanz
            const distance = Math.abs(this.X - this.startX);
            if (distance > 500) {
                this.remove();
                clearInterval(moveInterval);
            }
        }, 1000 / 60); // Aktualisierung mit 60 FPS
    }

    remove() {
        const index = this.world.projectils.indexOf(this);
        if (index > -1) {
            this.world.projectils.splice(index, 1);
        }
    }

    explode() {
        this.animateImagesOnce(this.Images); // z. B. Explosionsbilder
        setTimeout(() => {
            this.remove();
        }, this.Images.length * 100); // z. B. 6 Bilder × 100ms
    }
}