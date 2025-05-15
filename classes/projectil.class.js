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

    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.X = x;
        this.Y = y;
        this.startX = this.X;
        this.otherDirection = otherDirection;

        this.move();
        this.remove();
    }

    move() {
        setInterval(() => {
            if (this.otherDirection) {
                this.X -= 6;
            } else {
                this.X += 6;
            }
        }, 1000 / 60);
    }

    remove() {
        setInterval(() => {
            if (this.X >= this.startX + 740 || this.X <= this.startX - 740) {
                const index = world.projectils.indexOf(this);
                if (index > -1) {
                    world.projectils.splice(index, 1);
                }
            }
        }, 1000 / 60);
    }
}