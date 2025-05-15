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

    move() {
        this.startX = this.X; // Startpunkt merken

        const moveInterval = setInterval(() => {
            if (this.colliding) return;

            // Kollision mit Gegnern prüfen
            this.world.level.enemys.forEach(enemy => {
                if (this.isCollidingWith(enemy) && !this.colliding) {
                    this.colliding = true;
                    enemy.hit();
                    this.explode(); // Animation + Entfernen
                }
            });

            // Nur bewegen, wenn keine Kollision
            if (!this.colliding) {
                if (this.otherDirection) {
                    this.X -= 6;
                } else {
                    this.X += 6;
                }

                // Reichweite überschritten?
                const distance = Math.abs(this.X - this.startX);
                if (distance > 740) {
                    this.remove();
                    clearInterval(moveInterval); // Bewegung stoppen
                }
            }
        }, 1000 / 60);
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