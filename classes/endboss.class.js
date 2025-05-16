class Endboss extends MoveableObjekt {
    height = 200;
    width = 200;
    Y = 245;
    offset_X = 0;
    offset_Y = 75;
    offset_Width = 50;
    offset_Height = 90;
    otherDirection = true;
    life = 10;
    Images_IDLE = [
        'img/endboss/idle/Idle1.png',
        'img/endboss/idle/Idle2.png',
        'img/endboss/idle/Idle3.png',
    ];
    Images_HURT = [
        'img/endboss/hurt/Hurt1.png',
        'img/endboss/hurt/Hurt2.png',
    ];
    Images_DEAD = [
        'img/endboss/dead/Death0.png',
        'img/endboss/dead/Death1.png',
        'img/endboss/dead/Death2.png',
        'img/endboss/dead/Death3.png',
        'img/endboss/dead/Death4.png',
    ];



    constructor(x) {
        super();
        this.loadImage(this.Images_IDLE[0]);
        this.loadImages(this.Images_IDLE);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.X = x

        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.animateImages(this.Images_IDLE);
            }
        }, 1000 / 3);
    }
} 